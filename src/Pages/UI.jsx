import { useState } from "react";
import Button from "../Components/UI/Buttons/Button";
import Input from "../Components/UI/Inputs/Input";
import Select from "../Components/UI/Selects/Select";
import Loading from "../Components/UI/Loadings/Loading";
import Head from "../Components/UI/Head/Head";
import Paragraph from "../Components/UI/Paragraph/Paragraph";
import Text from "../Components/UI/Text/Text";
import Table from "../Components/UI/Table/Table";

export default function UI() {
    const [input, setInput] = useState('')

    const [selectedOption, setSelectedOption] = useState(null);
    const optionsSelect = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    const TableThead = ["Number", "Name", "Price", "Info", "Settings"]
    const TableTbody = [
        {
            Number: 1,
            Name: "Lap top",
            Price: "250 000",
            Info: "Good lap top",
            Settings: ''
        }
    ]

    return (
        <div className="h-screen overflow-hidden overflow-y-auto bg-[black] pt-[30px] pb-[50px]">
            <h1 className="text-center text-[30px] text-[white]">
                Welcome Example UI
            </h1>
            <div className="Container">

                {/* Button */}
                <div className="flex items-center justify-center gap-[100px] mt-[50px]">
                    <h2 className="text-[white]">
                        This is Button
                    </h2>
                    <Button onClick={() => console.log('Ok')} content={"Hello"} />
                </div>

                {/* Input */}
                <div className="flex items-center justify-center gap-[100px] mt-[50px]">
                    <h2 className="text-[white]">
                        This is Input
                    </h2>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type={"text"} placeholder={"Example ...."} inputText={"Example"} id={'Example'} />
                </div>

                {/* Select */}

                <div className="flex items-center justify-center gap-[100px] mt-[50px]">
                    <h2 className="text-[white] text-center">
                        This is select
                    </h2>
                    <Select
                        SelectText={"Example..."}
                        options={optionsSelect}
                        value={selectedOption}
                        onChange={setSelectedOption}
                    />
                </div>

                <div className="flex items-center justify-center mt-[50px]">
                    <div>
                        <h2 className="text-[white] text-center">
                            This is Loading
                        </h2>
                        <Loading />
                    </div>
                </div>


                {/* Head */}
                <div className="flex items-center justify-center gap-[100px] mt-[50px]">
                    <h2 className="text-[white]">
                        This is Head
                    </h2>

                    <Head number={1} textAlign={'right'} content={'Head'} weight={'normal'} color={'white'} size={'50px'} />
                </div>
                <div className="flex items-center justify-center gap-[100px] mt-[50px]">
                    <h2 className="text-[white]">
                        This is Paragraph
                    </h2>
                    <Paragraph
                        width={'500px'}
                        weight={'normal'}
                        size={'15px'}
                        color={'white'}
                        textAlign={'right'}
                        content={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quos harum veritatis amet tempore commodi quidem perferendis ratione, quo illo nihil obcaecati eos, alias sit eius delectus eveniet odio cupiditate.'} />
                </div>
                <div className="flex items-center justify-center gap-[100px] mt-[50px]">
                    <h2 className="text-[white]">
                        This is Text
                    </h2>
                    <Text
                        textAlign={'right'}
                        content={'Text'}
                        weight={'normal'}
                        color={'white'}
                        size={'20px'}
                    />
                </div>

                <div className="flex items-center justify-center mt-[50px] w-[100%]">
                    <div className="w-full">
                        <h2 className="text-[white] text-center mb-[20px] block">
                            This is Table
                        </h2>
                        <Table
                            theadColor={'white'}
                            thead={TableThead}
                            tbody={TableTbody}
                            pagapagination={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}