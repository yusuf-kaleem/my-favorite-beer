import React, { useState } from 'react'
import { Button, Modal } from 'antd';
// @ts-ignore
import { Form, Field } from "easy-react-form";

type Props = {}

function CustomeModal({ showModal, beer, setShowModal }: any) {
    const [saveList, setSaveList] = useState<any[]>([]);

    function submit(data: any) {
        let obj = { name: beer.name, img: beer.image_url, ...data };
        let list = saveList;
        list.push(obj);
        setSaveList(list);
        setShowModal(false);
        sessionStorage.setItem("table_data", JSON.stringify(list));
        window.dispatchEvent(new Event("storage"));
    }


    return (
        <div>
            <Modal
                visible={showModal}
                onCancel={() => { setShowModal(false) }}
                footer={null}
            >
                <div style={{ display: "flex", color: "#333" }}>
                    <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
                        <img height={400} src={beer.image_url}></img>
                    </div>
                    <div style={{ display: "flex", flex: 1 }}>
                        <Form
                            onSubmit={(v: any) => {
                                submit(v);
                            }}
                            style={{
                                width: "200px",
                                height: "30px",
                                fontSize: "12px",
                            }}
                        >
                            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                                {beer.name}
                            </h2>
                            <label>drink this beer before?</label>
                            <Field
                                name="drink_before"
                                component="input"
                                type="tel"
                                placeholder=""
                            />
                            <br></br>
                            <br></br>

                            <label>where you drunk? </label>
                            <Field name="where" component="input" type="tel" placeholder="" />
                            <br></br>
                            <br></br>

                            <label>when you drunk?</label>
                            <Field name="when" component="input" type="tel" placeholder="" />
                            <br></br>
                            <br></br>

                            <label>your taste note (1 to 5)? </label>
                            <Field
                                name="taste_note"
                                component="input"
                                type="tel"
                                placeholder=""
                            />
                            <br></br>
                            <br></br>

                            <label>Some comments.</label>
                            <Field
                                name="comment"
                                component="input"
                                type="tel"
                                placeholder=""
                            />
                            <br></br>
                            <br></br>

                            <button
                                style={{
                                    background: "#4893f0",
                                    color: "#fff",
                                    border: "none",
                                    fontSize: 14,
                                    padding: "3px 10px",
                                    borderRadius: 3,
                                }}
                            >
                                {" "}
                                Save{" "}
                            </button>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CustomeModal