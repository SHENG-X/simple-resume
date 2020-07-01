import React, {
  useRef,
  useState,
  useEffect,
} from "react"
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail"

const TextArea = ({ value, placeholder, label, className='', readOnly = false, onChange = () => {} }) => {
  const editorRef = useRef(null);
  const editorAreaRef = useRef(null);

  const [areaFocused, setAreaFocused] = useState(false);

  const focusEditor = () => {
    // if it is ready only mode then we
    // don't want to focus on the component
    if (readOnly) return;
    editorRef.current.focus();
    setAreaFocused(true);
  }

  const deFocusEditor = (event) => {
    // de-focus the editor only if clicked outside the component
    if (editorAreaRef.current && !editorAreaRef.current.contains(event.target)) {
      setAreaFocused(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", deFocusEditor);
    return () => {
      // remove event listener on component destroyed
      document.removeEventListener("mousedown", deFocusEditor);
    }
  });

  let initialState = {
    blocks: [
      {
        key: "b1ito",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };

  if (typeof value === 'object') {
    initialState = value;
  } else if (typeof value === 'string' && value !== '') {
    initialState.blocks[0].text = value;
  } else {
    initialState = null;
  }

  return(
    <>
      {
        !readOnly &&
        <label className="uppercase tracking-wide text-gray-600 text-xs font-semibold mb-2">
          {label}
        </label>
      }
      <div
        ref={editorAreaRef}
        className={`
          ${(readOnly ? (initialState === null ? 'textarea-none' : 'textarea-readOnly') : '')} 
          ${(areaFocused ? 'textarea-focused': '')} 
          ${className}
        `}
        onClick={focusEditor}
      >
        {
          readOnly ?
          <DraftailEditor
            rawContentState={initialState}
            maxListNesting={2}
          />
          :
          <DraftailEditor
            ref={editorRef}
            rawContentState={initialState}
            onSave={onChange}
            placeholder={placeholder}
            spellCheck
            blockTypes={[
              {
                type: BLOCK_TYPE.UNORDERED_LIST_ITEM,
                icon: <span className="material-icons">format_list_bulleted</span>
              },
              {
                type: BLOCK_TYPE.ORDERED_LIST_ITEM,
                icon: <span className="material-icons">format_list_numbered</span>
              },
            ]}
            inlineStyles={[
              {
                type: INLINE_STYLE.BOLD,
                icon: <span className="material-icons">format_bold</span>
              },
              {
                type: INLINE_STYLE.ITALIC,
                icon: <span className="material-icons">format_italic</span>
              },
              {
                type: INLINE_STYLE.UNDERLINE,
                icon: <span className="material-icons">format_underlined</span>
              }
            ]}
            maxListNesting={2}
          />
        }
      </div>
    </>
)}

export default TextArea;
