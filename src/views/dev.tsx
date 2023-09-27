// import React, { useState, useRef, useEffect } from 'react';
// import MonacoEditor from 'react-monaco-editor';
// import * as monaco from 'monaco-editor';
const data = `QEAgLTMsNiArMyw3IEBAIGltcG9ydCB7IEJ1dHRvbiwgTW9kYWwsIFRhYmxlLCBUYWcsIFRvb2x0aXAgfSBmcm9tICdhbnRkJzsKIGltcG9ydCB7IGFwaSB9IGZyb20gJ0Avc2VydmljZXMnOwogaW1wb3J0IFJldmlld1JlY29yZERldGFpbCBmcm9tICcuL1Jldmlld1JlY29yZERldGFpbCcKIGltcG9ydCB7IHVzZUxvY2F0aW9uIH0gZnJvbSAndW1pJzsKK2ltcG9ydCB0eXBlIHsgQ29sdW1uc1R5cGUgfSBmcm9tICdhbnRkL2VzL3RhYmxlJzsKIAogdHlwZSBQcm9wcyA9IHsKICAgICBpc1Jldmlld1JlY29yZE1vZGFsT3BlbjogYm9vbGVhbjsKQEAgLTEwLDYgKzExLDE4IEBAIHR5cGUgUHJvcHMgPSB7CiAgICAgc2VsZWN0ZWRSb3dLZXlzOiBhbnlbXQogfQogCitpbnRlcmZhY2UgRGF0YVR5cGUgeworICAgIGtleT86IFJlYWN0LktleTsKKyAgICBuYW1lPzogc3RyaW5nOworICAgIGNyZWF0ZV9pdG1lPzogc3RyaW5nOworICAgIGV4dHJhX2RhdGE/OiBzdHJpbmc7CisgICAgaWRzPzogc3RyaW5nOworICAgIHJldmlld19zdGF0dXM/OiBzdHJpbmc7CisgICAgdGl0bGU/OiBzdHJpbmc7CisgICAgdXBkYXRlZF9hdD86IHN0cmluZzsKKyAgICB1c2VyX25hbWU/OiBzdHJpbmc7Cit9CisKIGNvbnN0IFJldmlld1JlY29yZExpc3QgPSAocHJvcHM6IFByb3BzKSA9PiB7CiAgICAgY29uc3QgeyBpc1Jldmlld1JlY29yZE1vZGFsT3BlbiwgaGFuZGxlQ2FuY2VsUmV2aWV3UmVjb3JkTGlzdCwgc2VsZWN0ZWRSb3dLZXlzIH0gPSBwcm9wcwogICAgIGNvbnN0IFtkYXRhU291cmNlLCBzZXRkYXRhU291cmNlXSA9IHVzZVN0YXRlKFtdKQpAQCAtMzgsMjggKzUxLDI5IEBAIGNvbnN0IFJldmlld1JlY29yZExpc3QgPSAocHJvcHM6IFByb3BzKSA9PiB7CiAgICAgICAgIH0KICAgICB9LCBbaXNSZXZpZXdSZWNvcmRNb2RhbE9wZW5dKQogCi0gICAgY29uc3QgZ2V0UmV2aWV3UmVjb3JkID0gKCkgPT4geworICAgIGNvbnN0IGdldFJldmlld1JlY29yZCA9IGFzeW5jICgpID0+IHsKICAgICAgICAgc2V0TG9hZGluZyh0cnVlKQotICAgICAgICBhcGkucmVxdWlyZW1lbnQuUmVxdWlyZW1lbnRSZXZpZXdSZWNvcmRzTGlzdCh7CisgICAgICAgIGxldCByZXMgPSBhd2FpdCBhcGkucmVxdWlyZW1lbnQuUmVxdWlyZW1lbnRSZXZpZXdSZWNvcmRzTGlzdCh7CiAgICAgICAgICAgICBwcm9qZWN0X2lkOiBOdW1iZXIoTG9jYXRpb24ucXVlcnkucHJvZHVjdGlvblByb2plY3RJZCkKLSAgICAgICAgfSkudGhlbihyZXMgPT4gewotICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHsKLSAgICAgICAgICAgICAgICBzZXRkYXRhU291cmNlKHJlcy5kYXRhKQotICAgICAgICAgICAgfQotICAgICAgICB9KS5maW5hbGx5KCgpID0+IHNldExvYWRpbmcoZmFsc2UpKQorICAgICAgICB9KQorICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gc2V0TG9hZGluZyhmYWxzZSkpCiAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpCisgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7CisgICAgICAgICAgICBzZXRkYXRhU291cmNlKHJlcy5kYXRhKQorICAgICAgICB9CiAgICAgfQogCi0gICAgY29uc3QgY29sdW1ucyA9IFsKKyAgICBjb25zdCBjb2x1bW5zOiBDb2x1bW5zVHlwZTxEYXRhVHlwZT4gPSBbCiAgICAgICAgIHsKICAgICAgICAgICAgIHRpdGxlOiAn6ZyA5rGCSUQnLAogICAgICAgICAgICAgZGF0YUluZGV4OiAncmVxdWlyZW1lbnRfaWQnLAogICAgICAgICAgICAga2V5OiAncmVxdWlyZW1lbnRfaWQnLAorICAgICAgICAgICAgd2lkdGg6IDEwMCwKICAgICAgICAgICAgIGVsbGlwc2lzOiB7CiAgICAgICAgICAgICAgICAgc2hvd1RpdGxlOiBmYWxzZSwKICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICByZW5kZXI6ICh0ZXh0OiBzdHJpbmcpID0+ICgKLSAgICAgICAgICAgICAgICA8VG9vbHRpcCBwbGFjZW1lbnQ9ImxlZnQiIHRpdGxlPXt0ZXh0fT4KKyAgICAgICAgICAgICAgICA8VG9vbHRpcCBwbGFjZW1lbnQ9InRvcCIgdGl0bGU9e3RleHR9PgogICAgICAgICAgICAgICAgICAgICB7dGV4dH0KICAgICAgICAgICAgICAgICA8L1Rvb2x0aXA+CiAgICAgICAgICAgICApLApAQCAtNzIsNyArODYsNyBAQCBjb25zdCBSZXZpZXdSZWNvcmRMaXN0ID0gKHByb3BzOiBQcm9wcykgPT4gewogICAgICAgICAgICAgICAgIHNob3dUaXRsZTogZmFsc2UsCiAgICAgICAgICAgICB9LAogICAgICAgICAgICAgcmVuZGVyOiAodGV4dDogc3RyaW5nKSA9PiAoCi0gICAgICAgICAgICAgICAgPFRvb2x0aXAgcGxhY2VtZW50PSJsZWZ0IiB0aXRsZT17dGV4dH0+CisgICAgICAgICAgICAgICAgPFRvb2x0aXAgcGxhY2VtZW50PSJ0b3AiIHRpdGxlPXt0ZXh0fT4KICAgICAgICAgICAgICAgICAgICAge3RleHR9CiAgICAgICAgICAgICAgICAgPC9Ub29sdGlwPgogICAgICAgICAgICAgKSwKQEAgLTgyLDcgKzk2LDcgQEAgY29uc3QgUmV2aWV3UmVjb3JkTGlzdCA9IChwcm9wczogUHJvcHMpID0+IHsKICAgICAgICAgICAgIGRhdGFJbmRleDogJ2NyZWF0ZV9pdG1lJywKICAgICAgICAgICAgIGtleTogJ2NyZWF0ZV9pdG1lJywKICAgICAgICAgICAgIHJlbmRlcjogKHRleHQ6IHN0cmluZywgcmVjb3JkOiBhbnkpID0+IHsKLSAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBvbkNsaWNrPXsoKSA9PiB7IENyZWF0ZUl0bWUocmVjb3JkKSB9fT57dGV4dH08L2Rpdj4KKyAgICAgICAgICAgICAgICByZXR1cm4gPGEgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICJ1bmRlcmxpbmUiIH19IG9uQ2xpY2s9eygpID0+IHsgQ3JlYXRlSXRtZShyZWNvcmQpIH19Pnt0ZXh0fTwvYT4KICAgICAgICAgICAgIH0KICAgICAgICAgfSwKICAgICAgICAgewpAQCAtMTA0LDE1ICsxMTgsMTMgQEAgY29uc3QgUmV2aWV3UmVjb3JkTGlzdCA9IChwcm9wczogUHJvcHMpID0+IHsKICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICByZW5kZXI6ICh0ZXh0OiBhbnlbXSkgPT4gewogICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gdGV4dC5qb2luKCcsJykKLSAgICAgICAgICAgICAgICByZXR1cm4gPFRvb2x0aXAgcGxhY2VtZW50PSJsZWZ0IiBhdXRvQWRqdXN0T3ZlcmZsb3cgdGl0bGU9e2xpc3R9PgorICAgICAgICAgICAgICAgIHJldHVybiA8VG9vbHRpcCBwbGFjZW1lbnQ9InRvcCIgYXV0b0FkanVzdE92ZXJmbG93IHRpdGxlPXtsaXN0fT4KICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xpc3R9PC9zcGFuPgogICAgICAgICAgICAgICAgIDwvVG9vbHRpcD4KICAgICAgICAgICAgIH0KICAgICAgICAgfSwKICAgICBdOwogCi0KLQogICAgIGNvbnN0IGhhbmRsZUNhbmNlbCA9ICgpID0+IHsKICAgICAgICAgaGFuZGxlQ2FuY2VsUmV2aWV3UmVjb3JkTGlzdCgpCiAgICAgfTsKQEAgLTE0MCwxNCArMTUyLDE0IEBAIGNvbnN0IFJldmlld1JlY29yZExpc3QgPSAocHJvcHM6IFByb3BzKSA9PiB7CiAgICAgcmV0dXJuICgKICAgICAgICAgPE1vZGFsCiAgICAgICAgICAgICB0aXRsZT0i6K+E5a6h6K6w5b2VIgotICAgICAgICAgICAgd2lkdGg9ezkwMH0KKyAgICAgICAgICAgIHdpZHRoPXs4MDB9CiAgICAgICAgICAgICBmb290ZXI9e251bGx9CiAgICAgICAgICAgICBtYXNrQ2xvc2FibGU9e2ZhbHNlfQogICAgICAgICAgICAgZGVzdHJveU9uQ2xvc2U9e3RydWV9CiAgICAgICAgICAgICB2aXNpYmxlPXtpc1Jldmlld1JlY29yZE1vZGFsT3Blbn0KICAgICAgICAgICAgIG9uQ2FuY2VsPXtoYW5kbGVDYW5jZWx9PgogICAgICAgICAgICAgPFRhYmxlCi0gICAgICAgICAgICAgICAgLy8gcm93S2V5PXsocm93OiBhbnkpID0+IHJvdy5yZXF1aXJlbWVudF9pZH0KKyAgICAgICAgICAgICAgICByb3dLZXk9eyhyb3c6IGFueSkgPT4gcm93LnV1aWR9CiAgICAgICAgICAgICAgICAgbG9hZGluZz17TG9hZGluZ30KICAgICAgICAgICAgICAgICBkYXRhU291cmNlPXtkYXRhU291cmNlfQogICAgICAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9Cg==`
// // const data = `YmVmb3JlX3NjcmlwdDoKICAtIGVjaG8gInN0YXJ0IGNpY2QiIApzdGFnZXM6CiAgLSBjb21waWxlCiAgLSBidWlsZAogIC0gZGVwbG95Cgpjb21waWxlOgogIHN0YWdlOiBjb21waWxlCiAgaW1hZ2U6IG5vZGU6MTIuMjIuMQogIHNjcmlwdDoKICAgIC0gY2QgY29kZQojICAgIC0gbG4gLXMgL3Vzci9saWIvbm9kZV9tb2R1bGVzIC4vbm9kZV9tb2R1bGVzCiAgICAtIG5wbSBpbnN0YWxsCiAgICAtIG5wbSBydW4gYnVpbGQKICBhcnRpZmFjdHM6CiAgICBwYXRoczoKICAgIC0gY29kZS9idWlsZAogIHRhZ3M6CiAgICAtIG5vZGUyMzYKICAgIApidWlsZDoKICAgaW1hZ2U6IGRvY2tlcjpkaW5kCiAgIHN0YWdlOiBidWlsZAogICBzY3JpcHQ6CiAgICAgLSBlY2hvICJMb2dpbiAkQ0lfUkVHSVNUUlkiCiAgICAgLSBkb2NrZXIgbG9naW4gLXUgIiRDSV9SRUdJU1RSWV9VU0VSIiAtcCAiJENJX1JFR0lTVFJZX1BBU1NXT1JEIiAiJENJX1JFR0lTVFJZIgogICAgIC0gY3AgLXIgY29kZS9idWlsZCAgZGV2b3BzL2RvY2tlci8KICAgICAtIGRvY2tlciBidWlsZCAtdCAkQ0lfUkVHSVNUUlkvZGV2b3BzLyRDSV9QUk9KRUNUX05BTUU6JENJX0NPTU1JVF9SRUZfTkFNRSAtLWJ1aWxkLWFyZyBJVEVNPSRDSV9QUk9KRUNUX05BTUUgZGV2b3BzL2RvY2tlcgogICAgIC0gZG9ja2VyIHB1c2ggJENJX1JFR0lTVFJZL2Rldm9wcy8kQ0lfUFJPSkVDVF9OQU1FOiRDSV9DT01NSVRfUkVGX05BTUUKICAgcnVsZXM6CiAgICAtIGlmOiAkQ0lfQ09NTUlUX0JSQU5DSAogICAgICBleGlzdHM6CiAgICAgICAgLSBkZXZvcHMvZG9ja2VyL0RvY2tlcmZpbGUKICAgdGFnczoKICAgIC0gbm9kZTIzNgoKZGVwbG95OgogICBpbWFnZTogZG9ja2VyOmRpbmQKICAgc3RhZ2U6IGRlcGxveQogICBzY3JpcHQ6CiAgIC0gZWNobyAiTG9naW4gJENJX1JFR0lTVFJZIgogICAtIGRvY2tlciBsb2dpbiAtdSAiJENJX1JFR0lTVFJZX1VTRVIiIC1wICIkQ0lfUkVHSVNUUllfUEFTU1dPUkQiICIkQ0lfUkVHSVNUUlkiCiAgIC0gZG9ja2VyIHB1bGwgJENJX1JFR0lTVFJZL2Rldm9wcy8kQ0lfUFJPSkVDVF9OQU1FOiRDSV9DT01NSVRfUkVGX05BTUUKICAgLSBkb2NrZXIgaW1hZ2UgcHJ1bmUgLWYgLS1maWx0ZXIgInVudGlsPTI0aCIgICAKICAgLSBkb2NrZXIgc3RhY2sgZGVwbG95IC1jIGRldm9wcy9kb2NrZXIvZG9ja2VyLWNvbXBvc2UueW1sIC0td2l0aC1yZWdpc3RyeS1hdXRoIC0tcHJ1bmUgLS1yZXNvbHZlLWltYWdlIGFsd2F5cyAkQ0lfUFJPSkVDVF9OQU1FLSRDSV9DT01NSVRfUkVGX05BTUUKICAgdGFnczoKICAgIC0gbm9kZTIzNgo=`
// function MEditor() {
//   const editorRef: any = useRef(null);
//   const [editorValue, seteditorValue] = useState("");

//   const decodedData = atob(data);
//   const decodedText = decodeURIComponent(escape(decodedData));
//   useEffect(() => {
//     seteditorValue(decodedText)
//   }, [])

//   return (
//     <div>
//       <MonacoEditor
//         // width="100%"
//         height="400"
//         language="javascript" //语言
//         theme="vs" //编辑器主题
//         value={editorValue}//数据
//         options={
//           {
//             lineNumbersMinChars: 2,//显示行号数字
//             lineDecorationsWidth: 1,//装饰物的宽度
//             highlightActiveIndentGuide: false,//缩紧的高亮线
//             cursorSmoothCaretAnimation: true,//鼠标平滑移动效果
//             wordWrap: "on",//换行
//             readOnly: true,//不可编辑
//             contextmenu: false,//自定上下文内容
//             minimap: {
//               enabled: false,//缩放图
//             }
//           }
//         }
//         onChange={(v: any) => seteditorValue(v)}
//       />
//       {/* <button onClick={getSelectedText}>Get Code Content</button> */}
//     </div>

//   );
// }

// export default MEditor;



import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { Button, Spin, Modal, Form, Input, } from 'antd';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import Add from './add'

const App: React.FC = () => {
  const editorRef: any = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [loading, setloading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editorState, seteditorState] = useState(BraftEditor.createEditorState(null))

  const [selectedTextData, setselectedTextData] = useState("")
  // console.log(selectedTextData, "selectedTextData");


  useEffect(() => {
    setloading(true)
    const decodedData = atob(data);
    const decodedText = decodeURIComponent(escape(decodedData));
    const editorInstance = monaco.editor.create(document.getElementById('editor')!, {
      value: decodedText,
      language: 'javascript',
      theme: 'vs',
      readOnly: true,
      lineNumbersMinChars: 2,//显示行号数字
      lineDecorationsWidth: 1,//装饰物的宽度
      cursorSmoothCaretAnimation: 'off',
      minimap: {
        enabled: false,
      }
    });
    if (editorRef.current) {
      // 设置缩进的高亮线
      editorRef.current.updateOptions({ renderIndentGuides: true });
    }
    editorRef.current = editorInstance;
    setTimeout(() => {
      setloading(false)
    }, 500);
    return () => {
      editorInstance.dispose();
    };
  }, []);

  const getSelectedText = () => {
    const editorInstance: any = editorRef.current;
    if (editorInstance) {
      const selection = editorInstance.getSelection();
      const selectedText = selection ? editorInstance.getModel().getValueInRange(selection) : '';
      // const newEditorState = BraftEditor.createEditorState(selectedText);
      // seteditorState(newEditorState)
      setselectedTextData(selectedText)
      showModal()
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setselectedTextData("")
  };


  return (
    <div>
      <Spin spinning={loading}>
        <div id="editor" style={{ width: '800px', height: '300px' }}></div>
      </Spin>
      <Button style={{ marginTop: 8 }} type="primary" onClick={getSelectedText}>代码评审</Button>
      {isModalOpen && <Add
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        selectedTextData={selectedTextData} />}

    </div>
  );
};

export default App;
