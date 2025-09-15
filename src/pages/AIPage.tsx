import { useState } from 'react';
import AILayout from '../components/AILayout';
import InPuts from '../components/InPuts';
import Button from '../components/Button';
import { FiArrowRight } from 'react-icons/fi';

export default function AIPage() {
  const [query, setQuery] = useState('');

  return (
    <AILayout>
      <div className="flex flex-col items-center justify-center h-full min-h-[70vh] bg-[color:var(--color-style-500)]">
        <div className="w-full max-w-3xl mx-auto mt-16 sm:mt-24 px-2 sm:px-0">
          <div className=" mb-8 text-base sm:text-lg text-gray-700 font-medium">
            Your AI is here. Ask me anything.
          </div>
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              // handle search/submit here
            }}
          >
            <div className="relative w-full">
              <InPuts
                textarea={true}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search laws here..."
                className="rounded-xl border border-primary-800 px-3 sm:px-[0.75rem] pr-12 sm:pr-14 py-4 sm:py-5 bg-[color:var(--color-style-500)] shadow-none focus:ring-0 focus:outline-none text-base w-full resize-none"
                rows={1}
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="absolute top-1/2 right-2 sm:right-3 -translate-y-1/2 px-3 sm:px-4 py-2 bg-primary-800 text-white rounded-xl min-w-0 h-8"
              >
                <FiArrowRight />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AILayout>
  );
}
