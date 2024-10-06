import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useAppDispatch } from "../../../hooks/redux";
import { readNote } from "../../../store/notesList/notesListSlice";
import { Note } from "../../../types/note";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { Box } from "./ReadNoteModal.styles";
import parse from "html-react-parser";

interface ReadNoteModalProps {
  note: Note;
  type: string;
}

const ReadNoteModal = ({ note, type }: ReadNoteModalProps) => {
  const dispatch = useAppDispatch();

  const backgroundRef = useRef<HTMLDivElement>(null);

  const backgroundClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === backgroundRef.current) {
      dispatch(readNote({ type, id: note.id }));
    }
  };

  return (
    <FixedContainer
      ref={backgroundRef}
      onClick={(e) => backgroundClickHandler(e)}
    >
      <Box style={{ backgroundColor: note.color }}>
        <DeleteBox className="readNote__close-btn">
          <FaTimes onClick={() => dispatch(readNote({ type, id: note.id }))} />
        </DeleteBox>
        <div className="readNote__title">{note.title}</div>
        <div className="readNote__content">{parse(note.content)}</div>
      </Box>
    </FixedContainer>
  );
};

export default ReadNoteModal;
