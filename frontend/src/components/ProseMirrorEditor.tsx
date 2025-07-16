import React, { useState } from "react";
import { EditorState } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";
import { exampleSetup } from "prosemirror-example-setup";
import { ReactProsemirror } from "react-prosemirror";

type Props = {
  onChange: (doc: any) => void;
  content?: any;
};

const ProseMirrorEditor: React.FC<Props> = ({ onChange, content }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.create({
      doc: content || undefined,
      schema,
      plugins: exampleSetup({ schema }),
    })
  );

  const handleChange = (state: EditorState) => {
    setEditorState(state);
    onChange(state.doc.toJSON());
  };

  return (
    <div className="border border-gray-300 rounded-md p-2 min-h-[300px] dark:bg-slate-700">
      <ReactProsemirror state={editorState} onChange={handleChange} />
    </div>
  );
};

export default ProseMirrorEditor;
