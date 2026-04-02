import { useState, useEffect } from "react";
import ListColumns from "./ListColumns/ListColumns";
import Box from "@mui/material/Box";
import { mapOrder } from "~/utils/sort";
import {
  DragOverlay,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { cloneDeep } from "lodash";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board }) {
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

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns?.find((column) => column?.cards?.map((card) => card._id).includes(cardId));
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
    );
    setActiveDragItemData(event?.active?.data?.current);
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
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id);
        }
        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDragCardId);

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDragCardData);

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id);
        }

        return nextColumns;
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over) return;

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);

      setOrderedColumns(dndOrderedColumns);

      setActiveDragItemId(null);
      setActiveDragItemType(null);
      setActiveDragItemData(null);
    }
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

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === "light" ? "#e9f5db" : "#242424"),
          height: (theme) => theme.kanban.boardContentHeight,
          width: "100%",
          display: "flex",
        }}
      >
        <ListColumns columns={orderedColumns} />
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
