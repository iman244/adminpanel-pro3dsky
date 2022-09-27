import axios from "axios";

export async function uploadrar(url, fields, rarFile) {
  const form = new FormData();
  Object.entries(fields).forEach(([field, value]) => {
    form.append(field, value);
  });
  form.append("file", rarFile);

  for (var pair of form.entries()) {
    console.log(pair[0], pair[1]);
  }

  let urlpure = url.match(/(?<=https:\/\/)[\s\S]*/)[0];

  const response = await axios.post(
    `https://${fields.bucket}.${urlpure}`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        // setProgress(Math.round((100 * data.loaded) / data.total));
      },
    }
  );
  return response;
}
