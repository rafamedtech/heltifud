<script setup>
const store = useMainStore();
const { ticketUrl } = storeToRefs(store);

const cloudName = 'rafamed-dev'; // replace with your own cloud name
const uploadPreset = 'ioz6hugs'; // replace with your own upload preset

//   https://cloudinary.com/documentation/upload_widget_reference
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info);
      ticketUrl.value = result.info.secure_url;
    }
  }
);

function open() {
  myWidget.open();
}
</script>

<template>
  <div class="form-control gap-2">
    <h3 class="min-w-fit">Ticket</h3>
    <!-- <button @click="open" id="upload_widget" class="cloudinary-button">Upload files</button> -->
    <BaseButton type="button" class="mt-0" color="primary" id="upload_widget" @click="open"
      >Subir imagen</BaseButton
    >
  </div>
</template>
