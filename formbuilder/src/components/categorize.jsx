import { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


function Categorize({ el, questions, setQuestions, ind }) {
    // function to change question title
    const changeQuestionTitle = (e) => {
        let newObj = {
            ...el,
            questionTitle: e.target.value
        }
        let data = [...questions]
        data[ind] = newObj
        setQuestions([...data])
    }
    // function to handel category changes
    const handelCategoryChange = (event, e, i) => {
        let newCategories = [
            ...el.categories
        ]
        newCategories[i] = event.target.value
        let newObj = {
            ...el,
            categories: [...newCategories]
        }
        let data = [...questions]
        data[ind] = newObj
        setQuestions([...data])
    }
    // function to delete a exsiting category or items
    const deleteCatorItem = (event, e, i, type) => {
        let data = [...questions]

        if (type === 'cat') {
            if (data[ind].categories.length === 1)
                return
            data[ind].categories.splice(i, 1)
            setQuestions([...data])
        } else {
            if (data[ind].items.length === 1)
                return
            data[ind].items.splice(i, 1)
            setQuestions([...data])
        }
    }
    // function to add category
    const addCategory = (event) => {
        if (event.target.value === "" || event.target.value === null || event.target.value === undefined)
            return
        let newCategories = [
            ...el.categories
        ]
        if (newCategories.includes(event.target.value))
            return
        newCategories.push(event.target.value)
        let newObj = {
            ...el,
            categories: [...newCategories]
        }
        let data = [...questions]
        data[ind] = newObj
        setQuestions([...data])
    }

    //function to update items in respective category question
    const changeItemChange = (event, e, i) => {
        let newItem = [
            ...el.items
        ]
        newItem[i] = {
            ...newItem[i],
            item: event.target.value
        }
        let newObj = {
            ...el,
            items: [...newItem]
        }
        let data = [...questions]
        data[ind] = newObj
        setQuestions([...data])
    }

    // function to add an item
    const addItem = (event) => {
        if (event.target.value === "" || event.target.value === null || event.target.value === undefined)
            return
        let newItems = [
            ...el.items
        ]
        if (newItems.some(obj => obj.item === event.target.value))
            return
        newItems.push({
            item: event.target.value,
            belongsto: ""
        })
        let newObj = {
            ...el,
            items: [...newItems]
        }
        let data = [...questions]
        data[ind] = newObj
        setQuestions([...data])
    }
//fucntion to add item belons to which category
const itemBelongsTo=(cat,e,i)=>{
    let newItems = [
        ...el.items
    ]
    let obj={
    ...newItems[i],
    belongsto:cat
    }
    newItems[i]=obj
    let newobj={
        ...el,
        items:[...newItems]
    }
    let data=[...questions]
    data[ind]=newobj
    setQuestions([...data])
   
}



    return (
        <div>
            <p className="text-black font-bold  text-md">Question {ind + 1}</p>
            <input
                type="text"
                onChange={(e) => {
                    changeQuestionTitle(e)
                }}
                defaultValue={el.questionTitle}
                className="border mt-2 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter Description for the question"
            />
            <p className="text-black font-bold mt-5 text-md">Categories</p>

            <div className="category-container">
                {
                    el.categories.map((e, i) => {
                        return <div className="m-2 flex items-center max-w-400" key={e}>
                            <button className="flex items-center px-3 py-2 rounded text-gray-500 border-gray-500 hover:text-gray-900 hover:border-gray-900">
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 10a1 1 0 100 2h12a1 1 0 100-2H4zM15 15a1 1 0 100 2H4a1 1 0 100-2h11z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <input
                                type="text"
                                defaultValue={e}
                                onBlur={(event) => {
                                    handelCategoryChange(event, e, i)
                                }}
                                className="border mt-2 sm:mr-5 rounded-md px-3 w-full sm:w-90 lg:max-w-300 py-2 relative focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder={`Category ${i + 1}`}
                            />

                            <svg onClick={(event) => {
                                deleteCatorItem(event, e, i, "cat")
                            }} className="w-6 h-6 cursor-pointer right-2 sm:right-5 lg:right-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>





                        </div>
                    })
                }
                <input
                    type="text"
                    onBlur={(event) => {
                        addCategory(event)
                    }}
                    className="border ml-20 mt-2 rounded-md px-3 py-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add Category (Optional)"
                />

            </div>
            <p className="text-black font-bold mt-5 text-md">Items</p>
            <div className="item-container">
            {
                el.items.map((e, i) => {
                    return <div className="m-2 flex max-full items-center" key={el.item}>
                        <button className="flex items-center px-3 py-2 rounded text-gray-500 border-gray-500 hover:text-gray-900 hover:border-gray-900">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 10a1 1 0 100 2h12a1 1 0 100-2H4zM15 15a1 1 0 100 2H4a1 1 0 100-2h11z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            defaultValue={e.item}
                            onBlur={(event, e, i) => {
                                changeItemChange(event, e, i)
                            }}
                            className="border mt-2 sm:mr-5 rounded-md px-3 w-full sm:w-90 lg:max-w-300 py-2 relative focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder={`Item ${i + 1}`}
                        />

                        <svg
                            onClick={(event) => {
                                deleteCatorItem(event, e, i, "item")
                            }}
                            className="w-6 h-6 cursor-pointer right-2 sm:right-5 lg:right-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <Menu as="div"  className="relative ml-20 inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex relative h-10 w-[300px] justify-space-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    {e.belongsto}
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400 absolute right-5" aria-hidden="true" />
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
                                <Menu.Items className="absolute right-0 z-10 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {
                                            el.categories.map((cat,index)=>{
                                                return <Menu.Item>
                                                {({ active }) => (
                                                   <p 
                                                   onClick={()=>{
                                                    itemBelongsTo(cat,e,i)
                                                   }}
                                                   className="block cursor-pointer px-4 py-2 text-sm text-gray-700">{cat}</p>
                                                )}
                                            </Menu.Item>
                                            })
                                        }
                                       
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>


                    </div>

                })
            }
            </div>
            <input
                type="text"
                onBlur={(event) => {
                    addItem(event)
                }}
                className="border ml-20 mt-2 rounded-md px-3 py-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Add Items (Optional)"
            />

        </div>
    );
}

export default Categorize;
