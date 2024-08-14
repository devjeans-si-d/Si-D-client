<template>
  <div id="editor"></div>
  <v-btn outlined rounded="xl" @click="this.saveContent">Save</v-btn>
</template>

<script>
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style

export default {
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      el: document.querySelector("#editor"),
      height: "500px",
      initialEditType: "wysiwyg",
      hooks: {
        addImageBlobHook: async (blob, callback) => {
          // 1. 다른 서버에 이미지를 업로드
          const uploadResult = await this.uploadImage(blob);
          // 2. 1에서 업로드 된 이미지를 접근할 수 있는 url 세팅
          callback(uploadResult);
        },
      },
    });
  },
  methods: {
    
    async uploadImage(blob) {
      console.log(blob.name);
      const accessToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjI0MjYxMjYsImV4cCI6MTcyNTAxODEyNn0.PrHtUt1jhj_zl2FNJGRirdnJQTsorAMXAzcgVHfybJg";
      const body = {
        prefix: "test-prefix",
        url: `${blob.name}`,
      };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // JSON 형식의 데이터를 전송할 경우 Content-Type을 지정해야 합니다.
      };
      const getUrl = await fetch(
        "http://localhost:8080/api/upload/prisigned-url",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body), // body를 JSON 문자열로 변환하여 전송합니다.
        }
      );

      const urlContentType = getUrl.headers.get("content-type");
      let getUrlResult;
      if (urlContentType && urlContentType.includes("application/json")) {
        getUrlResult = await getUrl.json(); // JSON으로 파싱
      } else {
        getUrlResult = await getUrl.text(); // 텍스트로 파싱
      }

      const awsUrl = {
        data: `${getUrlResult.split("?")[0]}`,
        auth: `?${getUrlResult.split("?")[1]}`,
      };

      // // 파일을 S3에 업로드
      const options = {
        method: "PUT", // PUT 메서드 사용
        headers: {
          "Content-Type": blob.type, // Blob의 MIME 타입 설정
        },
        body: blob, // 업로드할 파일 데이터
      };
      console.log(new Date());
      let response = await fetch(awsUrl.data + awsUrl.auth, options);
      console.log(response);

      return awsUrl.data;
    },
    saveContent() {
    console.log("클릭")
    console.log("저장"+this.editor.getMarkdown());
      // try {
      //   // 에디터에서 작성된 내용을 마크다운 형식으로 가져오기
      //   const content = this.editor.getMarkdown();

      //   // fetch를 사용하여 서버에 POST 요청 보내기
      //   const response = await fetch("http://localhost:8080/api/save-content", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       content: content, // 전송할 데이터
      //       title: "Your Article Title" // 제목이나 다른 메타데이터 추가 가능
      //     })
      //   });

      //   // 응답 처리
      //   if (response.ok) {
      //     const responseData = await response.json();
      //     console.log("Content saved successfully:", responseData);
      //   } else {
      //     console.error("Failed to save content:", response.statusText);
      //   }
      // } catch (error) {
      //   console.error("Error saving content:", error);
      // }
    }
  },
  
  
};
</script>
