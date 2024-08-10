<template>
  <div id="editor"></div>
</template>

<script>
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import axios from "axios";

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
          callback(uploadResult.imageAccessUrl);
        },
      },
    });
  },
  methods: {
    getCurrentAmzDate() {
    const now = new Date();

    // 년, 월, 일, 시간, 분, 초 구하기
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');

    // 형식 맞추기
    const amzDate = `${year}${month}${day}T${hours}${minutes}${seconds}Z`;

    return amzDate;
  },
    async uploadImage(blob) {
      console.log(blob);

      const accessToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjI0MjYxMjYsImV4cCI6MTcyNTAxODEyNn0.PrHtUt1jhj_zl2FNJGRirdnJQTsorAMXAzcgVHfybJg";
      const body = {
        prefix: "test-prefix",
        url: "image.jpg",
      };
      const headers = { Authorization: `Bearer ${accessToken}` };
      // Presigned URL을 얻기 위한 요청
      const awsUrl = await axios.post(
        "http://localhost:8080/api/upload/prisigned-url",
        body,
        { headers }
      );
      console.log("URL :: " + awsUrl.data);
      // const awsUrl = response.data.url; // 서버로부터 받은 presigned URL

      // // 파일을 S3에 업로드
      const options = {
        headers: {
          "Content-Type": blob.type,
          Authorization: `Bearer ${accessToken}`,
        },
      };
      console.log(new Date());
      const params = {
        "x-amz-acl": "public-read",
        "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
        "X-Amz-Date": this.getCurrentAmzDate(),
        "X-Amz-SignedHeaders": "host",
        "X-Amz-Expires": "120",
        "X-Amz-Credential":
          "AKIAU2F4JCEWJILQBNXP%2F20240810%2Fap-northeast-2%2Fs3%2Faws4_request",
        "X-Amz-Signature":
          "f57d117c7a92d8b9266b814fa8bc71a6bde1e8d02947caa1cdedf84210eed3a0",
      };
      let response = await axios.put(awsUrl.data, blob, options,params); // formData와 options를 각각 두 번째, 세 번째 인자로 전달
      let result = response.data;

      return result;
    },
  },
};
</script>
