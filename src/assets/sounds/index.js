import { Colors } from '../../constants';

const sound1 = require('./alarm1.mp3');
const sound2 = require('./alarm2.mp3');
const sound3 = require('./alarm3.mp3');
const sound4 = require('./alarm4.mp3');

export default [
  {
    label: 'Classic',
    value: '1',
    color: Colors.darkGray,
    audio: sound1,
  },
  {
    label: 'Amber',
    value: '2',
    color: Colors.darkGray,
    audio: sound2,
  },
  {
    label: 'Old Town Road',
    value: '3',
    color: Colors.darkGray,
    audio: sound3,
  },
  {
    label: 'Big Ol\'e Chicken',
    value: '4',
    color: Colors.darkGray,
    audio: sound4,
  },
];
