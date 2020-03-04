import HttpStatus from 'http-status';
import { WebClient } from '@slack/web-api';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});
const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

export default class SlackController {
  constructor() {
    this.channelId = process.env.CHANNEL;
    this.web = new WebClient(process.env.BOTTOKEN);
  }

  async marketplace(payload, file) {
    try {
      if (!file) {
        return this.sendMessage({
          channelId: this.channelId,
          attachments: payload.attachments,
          comment: payload.comment || '',
        });
      }
      return this.sendFile({ channelId: this.channelId, file, comment: payload.comment || '' });
    } catch (error) {
      return errorResponse(error);
    }
  }

  async sendFile({ channelId, file, comment = '' }) {
    try {
      if (!file) {
        throw new Error('file is required');
      }
      const config = {
        filename: file.filename,
        channels: channelId,
        file: fs.createReadStream(file.path),
      };
      if (comment) {
        config.initial_comment = comment;
      }

      const result = await this.web.files.upload(config);
      fs.unlinkSync(file.path);
      return defaultResponse(result, HttpStatus.CREATED);
    } catch (error) {
      fs.unlinkSync(file.path);
      return errorResponse(error);
    }
  }

  async sendMessage({ channelId, attachments = [], comment = '' }) {
    try {
      const config = {
        channel: channelId,
      };

      if (comment) {
        config.text = comment;
      }

      if (attachments.length) {
        config.attachments = attachments;
      }
      const result = await this.web.chat.postMessage(config);
      return defaultResponse(result, HttpStatus.CREATED);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
