import { model, Schema } from 'mongoose';

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: Array<string>,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    streamingLink: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

movieSchema.index({ title: 1 });

const MovieModel = model('Movies', movieSchema);

export default MovieModel;
