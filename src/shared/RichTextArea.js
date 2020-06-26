import React, {
    useState,
    useRef,
    useEffect,
} from 'react';
import {Editor, EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';

const Controller = ({ name, handler, inUse }) => (
    <div className="flex justify-center items-center cursor-pointer hover:text-blue-500 noselect"
        style={{'width': '24px', 'height': '24px', 'fontSize': '18px'}}
        onClick={handler}
    >
        <span className={`material-icons ${inUse ? 'text-blue-500' : ''}`}>
            {name}
        </span>
    </div>
)
const isJSON = (str) => {
    if ( /^\s*$/.test(str) ) return false;
    str = str.replace(/\\(?:["\\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (/^[\],:{}\s]*$/).test(str);
}
const RichTextArea = ({value, placeholder, className, style, label, narrow = false, onChange = ()=>{}, readOnly = false}) => {
    // fill initial state with empty state to start
    let initialState = EditorState.createEmpty();;
    if(value){
        if(isJSON(value)){
            // fill initial state with the last saved state
            initialState = EditorState.createWithContent(convertFromRaw(JSON.parse(value)));
        }else{
            // plain text is received then convert it to editor state
            initialState = EditorState.createWithContent(ContentState.createFromText(value));
        }
    }
    const [editorState, setEditorState] = useState(initialState);
    const [focused, setFocused] = useState(false);
    const editorRef = useRef(null);
    const editorAreaRef = useRef(null);

    const focusEditor = () => {
        editorRef.current.focus();
        setFocused(true);
    }

    const defocusEditor = (event) => {
      if (editorAreaRef.current && !editorAreaRef.current.contains(event.target)) {
        setFocused(false);
      }
    }

    useEffect(() => {
      document.addEventListener("mousedown", defocusEditor);
      return () => {
        document.removeEventListener("mousedown", defocusEditor);
      }
    });

    const handleChange = (v) => {
        setEditorState(v);
        onChange(JSON.stringify(convertToRaw(v.getCurrentContent())));
    }

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState) {
            handleChange(newState);
          return true;
        }
        return false;
    }

    const setStyle = (style) => {
        handleChange(RichUtils.toggleInlineStyle(editorState, style));
    }

    const setBlockType = (type) => {
        handleChange(RichUtils.toggleBlockType(editorState, type));
    }
    
    const contentState = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();
    const currentStyle = editorState.getCurrentInlineStyle();
    const hasBold = currentStyle.has('BOLD');
    const hasItalic = currentStyle.has('ITALIC');
    const hasUnderline = currentStyle.has('UNDERLINE');

    const currentSelectionKey = currentSelection.getAnchorKey()
    const hasOL = contentState.getBlockForKey(currentSelectionKey).getType() === 'ordered-list-item';
    const hasUL = contentState.getBlockForKey(currentSelectionKey).getType() === 'unordered-list-item';
    
    if(readOnly && (initialState.getCurrentContent().getPlainText() === '')){
        // in read only mode if no text is there then render nothing
        return null;
    }
    return(
        <div className={`flex flex-col ${readOnly ? `noselect text-sm ${className}`: ''} ${narrow ? 'description-area-narrow' : ''}`}
            style={style}
        >
            {
                !readOnly && 
                <label className="uppercase tracking-wide text-gray-600 text-xs font-semibold mb-2">
                    {label}
                </label>
            }
            <div
                className={`flex flex-col appearance-none flex-grow block leading-7 w-full rounded ${readOnly ? '' :'border py-3 px-4' } ${ focused ? (readOnly ? '' : 'outline-none bg-white border-gray-500'): (readOnly ?  '': 'bg-gray-200 text-gray-800 border-gray-200')}`}
                style={{'maxHeight': '560px'}}
                ref={editorAreaRef}
            >
                {
                    !readOnly && 
                    <div className="flex"
                        style={{'marginLeft': '-6px'}}
                    >
                        <Controller
                            name="format_bold"
                            inUse={focused && hasBold}
                            handler={() => setStyle('BOLD')}
                        />
                        <Controller
                            name="format_italic"
                            inUse={focused && hasItalic} 
                            handler={() => setStyle('ITALIC')}
                        />
                        <Controller
                            name="format_underlined"
                            inUse={focused && hasUnderline} 
                            handler={() => setStyle('UNDERLINE')}
                        />
                        <div className='flex justify-center items-center'
                            style={{
                                'height': '20px',
                                'width': '1px',
                                'backgroundColor': 'rgb(207, 214, 230)',
                                'margin': '0px 10px'
                            }}
                        />
                        <Controller
                            name="format_list_bulleted"
                            inUse={focused && hasUL} 
                            handler={() => setBlockType('unordered-list-item')}
                        />
                        <Controller
                            name="format_list_numbered"
                            inUse={focused && hasOL}  
                            handler={() => setBlockType('ordered-list-item')}
                        />
                    </div>
                }
                <div 
                    className="flex-grow overflow-auto"
                    onClick={focusEditor}
                >
                    <Editor 
                        placeholder={placeholder}
                        ref={editorRef}
                        editorState={editorState}
                        onChange={handleChange}
                        handleKeyCommand={handleKeyCommand}
                        onBlur={defocusEditor}
                        readOnly={readOnly}
                    />
                </div>
            </div>
        </div>
        
    );
}
export default RichTextArea;