import { usePlayers } from '@/common/recoil/players';

const PlayerSelection = ({
  selected,
  single = false,
  handleSelect,
}: {
  selected: number[];
  single?: boolean;
  handleSelect: (selected: number[]) => void;
}) => {
  const { players, currentPlayer } = usePlayers();

  const handleClick = (index: number) => {
    if (single) handleSelect([index]);
    else if (selected.includes(index))
      handleSelect(selected.filter((num) => num !== index));
    else handleSelect([...selected, index]);
  };

  return (
    <div>
      {players.map((player, index) => (
        <button
          key={index}
          className="flex items-center gap-2 rounded-lg p-1 transition-transform hover:scale-105 focus:scale-105 active:scale-100 disabled:opacity-20"
          onClick={() => handleClick(index)}
          disabled={currentPlayer === index}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-500">
            <div
              className={`h-4 w-4 rounded-full ${
                !selected.includes(index) && 'opacity-0'
              } bg-red-500`}
            />
          </div>
          <p>{player.name}</p>
        </button>
      ))}
    </div>
  );
};

export default PlayerSelection;
