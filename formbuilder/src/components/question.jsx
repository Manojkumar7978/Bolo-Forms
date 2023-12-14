import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Categorize from './categorize'
import Cloze from './cloze'
import Comprehension from './comprehension'


function Question({ el, questions, setQuestions, ind,initialObj }) {

  //change the question type
  const changeQuestionType = (type) => {
    let newEle = {
      ...el,
      type: type
    }
    let data = [...questions]
    data[ind] = newEle
    setQuestions([...data])
  }

  // function to add question
  const addQuestion=()=>{
    setQuestions([...questions,initialObj])
  }

  //function to delete a question
  const deleteQuestion=()=>{
    let data=[...questions]
    data.splice(ind,1)
    setQuestions([...data])

  }

  return (
    <div className='flex justify-spacebetween items-center  w-[90%] m-auto gap-5'>
      <div className=' w-full m-auto rounded-md border-l-4 border-blue-500 shadow-md p-5'>
        {/* {type of question available here } */}
        <Menu as="div" className="relative w-[150px] m-auto text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {el.type}
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item >
                  {({ active }) => (
                    <list
                      onClick={() => {
                        changeQuestionType('Categorize')
                      }}
                      className={'cursor-pointer text-gray-700 block px-4 py-2 text-sm'}>Categorize</list>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <list
                      onClick={() => {
                        changeQuestionType('Cloze')
                      }}
                      className={'cursor-pointer text-gray-700 block px-4 py-2 text-sm'}>Cloze</list>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <list
                      onClick={() => {
                        changeQuestionType('Comprehension')
                      }}
                      className={'cursor-pointer text-gray-700 block px-4 py-2 text-sm'}>Comprehension</list>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* categorize question  */}
        {
          el.type === 'Categorize' &&
          <Categorize el={el} ind={ind} questions={questions} setQuestions={setQuestions} />
        }
        {
          el.type==='Cloze' &&
          <Cloze el={el} ind={ind} questions={questions} setQuestions={setQuestions}/>
        }
        {
          el.type==='Comprehension' &&
          <Comprehension el={el} ind={ind} questions={questions} setQuestions={setQuestions} />
        }
      </div>
      <div>
        <button
        onClick={()=>{
          addQuestion()
        }}
        class="mb-5 text-2xl w-10 h-10 inline-flex items-center justify-center rounded-md border border-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
          +
        </button>
        <button 
        onClick={()=>{
          deleteQuestion()
        }}
        class="text-2xl w-10 h-10 inline-flex items-center justify-center rounded-md border border-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
          <svg class="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

        </button>
      </div>
    </div>
  );
}

export default Question;
