import { FiZap } from 'react-icons/fi';

export default function AICard() {
  return (
    <div className="bg-primary-100 rounded-xl p-6 w-full">
      <h2 className="text-lg font-bold text-primary-800 mb-2">LAW OF THE DAY</h2>
      <p className="text-secondary-300 text-base mb-4">
        The statute of limitation sets lawsuit deadlines; missing them ends rights,
        <br />
        ensuring fairness and timely justice.
      </p>
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-primary-800 text-white font-bold px-5 py-2 rounded-md shadow">
          <FiZap className="text-lg" />
          Generate
        </button>
      </div>
    </div>
  );
}
