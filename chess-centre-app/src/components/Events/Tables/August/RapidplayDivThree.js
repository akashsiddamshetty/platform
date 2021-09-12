import React from "react";
import { Standings } from "./Standings";
import { PairingsTable } from "./Pairings";

export const CongressEntries = [
  {
    id: 1,
    name: "Oleg Kungurovs",
    ratingInfo: {
      rating: undefined,
    },
  },
  {
    id: 2,
    name: "Charlie Woodbridge",
    ratingInfo: {
      rating: undefined,
    },
  },
  {
    id: 3,
    name: "Aidan Lee-Wardell",
    ratingInfo: {
      rating: undefined,
    },
  },
  {
    id: 4,
    name: "Hugh Blythe",
    ratingInfo: {
      rating: undefined,
    },
  },
  {
    id: 5,
    name: "Brad Slater",
    ratingInfo: {
      rating: undefined,
    },
  },
  {
    id: 6,
    name: "Jack Hupton",
    ratingInfo: {
      rating: undefined,
    },
  },
];

const SixPlayerPairings = [
  {
    round: 1,
    pairings: [
      [1, 6],
      [2, 5],
      [3, 4],
    ],
  },
  {
    round: 2,
    pairings: [
      [6, 4],
      [5, 3],
      [1, 2],
    ],
  },
  {
    round: 3,
    pairings: [
      [2, 6],
      [3, 1],
      [4, 5],
    ],
  },
  {
    round: 4,
    pairings: [
      [6, 5],
      [1, 4],
      [2, 3],
    ],
  },
  {
    round: 5,
    pairings: [
      [3, 6],
      [4, 2],
      [5, 1],
    ],
  },
];

const results = [
  {
    round: 1,
    pairResults: [[1,0], [1,0], [1,0]],
  },
  {
    round: 2,
    pairResults: [[0,1], [1,0], [0,1]],
  },
  {
    round: 3,
    pairResults: [[1,0], [0,1], [1,0]],
  },
  {
    round: 4,
    pairResults: [[0,1], [1,0], [1,0]],
  },
  {
    round: 5,
    pairResults: [[1,0], [0.5,0.5], [0,1]],
  },
];

const players = [
  ...CongressEntries.slice(0, 6).map((m, i) => {
    m.seed = i + 1;
    return m;
  }),
];

const resultCheck = () => {
  const resultBySeed = [];
  SixPlayerPairings.forEach(({ round, pairings }) => {
    const pairingResults = results.find((r) => r.round === round).pairResults;
    pairings.forEach((board, index) => {
      const whitePlayer = board[0];
      const blackPlayer = board[1];
      const whiteResultOfSeed = pairingResults[index][0];
      const blackResultOfSeed = pairingResults[index][1];
      resultBySeed.push(
        {
          seed: whitePlayer,
          result: whiteResultOfSeed,
          opponent: blackPlayer,
          round,
        },
        {
          seed: blackPlayer,
          result: blackResultOfSeed,
          opponent: whitePlayer,
          round,
        }
      );
    });
  });
  const roundByRound = resultBySeed.reduce((player, { seed, result }) => {
    if (!player[seed]) {
      const p = players.find((p) => p.seed === seed);
      player[seed] = {
        rounds: [result],
        total: result || 0,
        name: p.name,
        rating: p.ratingInfo.rating,
      };
    } else {
      player[seed].rounds.push(result);
      player[seed].total += result || 0;
    }
    return player;
  }, {});
  return { resultBySeed, roundByRound };
};

const { roundByRound } = resultCheck(players);

export default function Rapidplay() {
  return (
    <div className="grid grid-cols-1 p-4">
      <div className="">
        <Standings roundByRound={roundByRound} division={"Division 3"}></Standings>
      </div>
      <div className="text-2xl mt-4 py-2 font-semibold text-gray-700 text-left"><i className="far fa-caret-left text-teal-500 ml-4"></i></div>
      <div className="mt-6">
          <p>Next Round</p>
          <PairingsTable
            format={SixPlayerPairings[4]}
            players={players}
            results={results}
            indexer={6}
          />
      </div>
    </div>
  );
}