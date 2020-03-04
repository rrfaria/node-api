import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import SlackController from '../controllers/slack';

const multerConfig = {
  dest: path.resolve(__dirname, '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      const newFile = file;
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        newFile.key = `${hash.toString('hex')}-${newFile.originalname}`;

        cb(null, newFile.key);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};

export default (app) => {
  const slackController = new SlackController();
  app.route('/slack/mktplace')
    .post(multer(multerConfig).single('image'), (req, res) => {
      slackController.marketplace(req.body, req.file)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};
