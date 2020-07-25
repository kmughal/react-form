import { IncomingForm } from "formidable";
export default async (req, res) => {
  await new Promise((resolve) => {
    new IncomingForm().parse(req, (err, fields, files) => {
      if (err) {
        res.status(500);
      } else {
        let fileList = [];
        if (files) {
          for (let index in files) {
            fileList.push(files[index].name);
          }
        }
        let payload = { ...fields, files: fileList };
        res.status(200).json(payload);
      }
      resolve();
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
