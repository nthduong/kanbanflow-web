import { useState, useEffect, useCallback, useRef } from "react";
import ListColumns from "./ListColumns/ListColumns";
import Box from "@mui/material/Box";
import { mapOrder } from "~/utils/sort";
import {
  DragOverlay,
  DndContext,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter,
} from "@dnd-kit/core";
import { MouseSensor, TouchSensor } from "~/customLibraries/DndKitSensors";
import { cloneDeep, isEmpty } from "lodash";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { generatePlaceholderCard } from "~/utils/formatters";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board, createNewColumn, createNewCard }) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumn, setOldColumn] = useState(null);

  const lastOverId = useRef();

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns?.find((column) => column?.cards?.map((card) => card._id).includes(cardId));
  };

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overDragCardId,
    active,
    over,
    activeColumn,
    activeDragCardId,
    activeDragCardData,
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overDragCardId);

      let newCardIndex;

      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id);
      const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id);

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDragCardId);
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id);
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDragCardId);

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
          ...activeDragCardData,
          columnId: overColumn._id,
        });

        nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_PlaceholderCard);

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id);
      }

      return nextColumns;
    });
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
    );
    setActiveDragItemData(event?.active?.data?.current);

    if (event?.active?.data?.current?.columnId) {
      setOldColumn(findColumnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;
    if (!active || !over) return;

    const {
      id: activeDragCardId,
      data: { current: activeDragCardData },
    } = active;
    const { id: overDragCardId } = over;

    const activeColumn = findColumnByCardId(activeDragCardId);
    const overColumn = findColumnByCardId(overDragCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overDragCardId,
        active,
        over,
        activeColumn,
        activeDragCardId,
        activeDragCardData,
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDragCardId,
        data: { current: activeDragCardData },
      } = active;
      const { id: overDragCardId } = over;

      const activeColumn = findColumnByCardId(activeDragCardId);
      const overColumn = findColumnByCardId(overDragCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumn._id !== overColumn._id) {
        // kéo thả 2 column khác nhau

        moveCardBetweenDifferentColumns(
          overColumn,
          overDragCardId,
          active,
          over,
          activeColumn,
          activeDragCardId,
          activeDragCardData,
        );
      } else {
        // kéo thả 2 column giống nhau

        const oldCardIndex = oldColumn?.cards?.findIndex((c) => c._id === activeDragItemId);
        const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overDragCardId);

        const dndOrderedCards = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex);

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          const targetColumn = nextColumns.find((column) => column._id === oldColumn._id);
          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id);

          return nextColumns;
        });
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex((c) => c._id === active.id);
        const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id);

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex);

        setOrderedColumns(dndOrderedColumns);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumn(null);
  };

  const CustomDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      const pointerIntersection = pointerWithin(args);

      const intersections = !!pointerIntersection?.length ? pointerIntersection : rectIntersection(args);

      let overId = getFirstCollision(intersections, "id");

      if (overId) {
        const checkColumn = orderedColumns.find((column) => column._id === overId);

        if (checkColumn) {
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => {
              return container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id);
            }),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns],
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === "light" ? "#e9f5db" : "#242424"),
          height: (theme) => theme.kanban.boardContentHeight,
          width: "100%",
          display: "flex",
        }}
      >
        <ListColumns columns={orderedColumns} createNewColumn={createNewColumn} createNewCard={createNewCard} />
        <DragOverlay dropAnimation={CustomDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData}></Column>}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData}></Card>}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
