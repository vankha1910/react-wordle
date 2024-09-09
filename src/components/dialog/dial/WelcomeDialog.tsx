import RevealRow from '../../grid/RevealRow';
import { Row } from '../../../types/game.type';

const WelcomeDialog = () => {
  const exampleRow: Row = [
    { char: 't', status: 'correct' },
    { char: 'h', status: 'absent' },
    { char: 'e', status: 'present' },
    { char: 'm', status: 'absent' },
    { char: 'e', status: 'present' },
  ];
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl mb-2 font-bold'>Welcome !</h2>
      <hr className='self-stretch w-full bg-[#555] h-[1px] my-1' />
      <h3 className='text-base font-semibold uppercase p-2'>
        How to guess the word of the day in 6 guesses
      </h3>
      <ul className='flex flex-col gap-2 list-disc'>
        <li>Each guess must be a valid 5-letter word.</li>
        <li>
          The color of the tiles will change to show how close your guess was to
          the word.
        </li>
        <li>A green letter is correctly placed.</li>
        <li>A yellow letter is used in the word, but not in this place.</li>
        <li>A gray letter is not used in the word.</li>
      </ul>
      <hr className='self-stretch w-full bg-[#555] h-[1px] mt-4 mb-2' />

      <h3 className='text-base mb-1'>Examples</h3>
      <RevealRow row={exampleRow}></RevealRow>
      <ul className='flex flex-col gap-2 list-disc mt-4'>
        <li>
          The correct word has <em>at least</em> one <strong>T</strong> and one
          of those is in the first position.
        </li>
        <li>
          The correct word has <em>exactly</em> one <strong>E</strong> but it's
          not in the third (or fifth) position.
        </li>
        <li>
          The correct word has <em>zero</em> <strong>H</strong> and{' '}
          <strong>M</strong>.
        </li>
        <li>
          Note how the correct word can have multiple <strong>T</strong>
          's but not multiple <strong>E</strong>'s. So <strong>TATER</strong> is
          a potential word, but <strong>TENET</strong> is not.
        </li>
      </ul>
    </div>
  );
};

export default WelcomeDialog;
