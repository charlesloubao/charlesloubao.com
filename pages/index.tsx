import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, {createRef, PropsWithChildren, ReactNode, useEffect, useRef, useState} from "react";
import {FaComment, FaCross, FaEnvelope, FaGithub, FaSkullCrossbones, FaTwitter, FaYoutube} from "react-icons/fa";
import Card from '../components/Card';
import Styles from '../styles/Home.module.scss'
import {BiX} from "react-icons/bi";


function SocialLink({icon, handle, url}: { icon: ReactNode, handle: string, url: string }) {
    return <a
        target={"_blank"}
        rel={"noreferrer"}
        className="inline-flex flex-wrap items-center gap-2 border p-2 rounded-md hover:bg-gray-50 transition-colors font-semibold"
        href={url}>
        {icon}
        {handle}
    </a>
}

export function Skill({children}: PropsWithChildren<any>) {
    return <span
        className="text-sm inline-block bg-gray-100 text-gray-600 font-semibold px-3 p-2 rounded-full">
                                    {children}
                            </span>
}

const description = "Full-stack developer based in the United States with 3 years of experience building web applications with React and Node.js. I am currently looking for contracting work "
const Home: NextPage = () => {

    const mobileCTARef = createRef<HTMLDivElement>()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [subject, setSubject] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const [showContactForm, setShowContactForm] = useState<boolean>(false)
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

    function onContentScroll(event: React.UIEvent) {
        const target = event.target as HTMLElement
        const scrollTop = (target).scrollTop
        const screenHeight = target.getBoundingClientRect().height

        if (scrollTop > screenHeight / 2) {
            mobileCTARef.current?.classList.remove("-translate-y-full")
        } else {
            mobileCTARef.current?.classList.add("-translate-y-full")

        }
    }

    async function sendContactFormData(event: React.FormEvent) {
        event.preventDefault()

        const data = {
            name,
            email,
            subject,
            content
        }

        setFormStatus("sending")

        try {
            let response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.status)

            if (response !== 200) {
                throw "An error occurred"
            }

            setFormStatus("success")
        } catch (e) {
            setFormStatus("error")
        }
    }

    function closeContactForm() {
        setShowContactForm(false)
        setFormStatus("idle")
        setName("")
        setEmail("")
        setSubject("")
        setContent("")
    }

    return <>
        <Head>
            <title>Charles Eugene Loubao</title>
            <meta name="description"
                  content={description}/>

            <meta property="og:title"
                  content="Charles Eugene Loubao"/>
            <meta property="og:description"
                  content={description}/>

            <meta property="og:image" content="https://charlesloubao.com/me.jpg"/>

            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:site" content="@charlesloubao"/>
            <meta name="twitter:title" content="Charles Eugene Loubao"/>
            <meta name="twitter:description" content={description}/>
        </Head>
        <main onScroll={onContentScroll} className="w-full h-full p-4 bg-gray-50 overflow-auto md:relative">
            <div className="gap-4 xl:py-16 xl:w-2/3 md:mx-auto">
                <>

                    <div className="md:w-1/3 xl:w-1/5 mb-4 xl:fixed md:float-left">
                        <Card className="mb-4">
                            <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden mb-4">
                                <Image src={"/me.jpg"} layout={"fill"}/>
                            </div>

                            <h1 className="mb-2 text-3xl font-bold uppercase">Charles-Eugene Loubao</h1>
                            <div className="mb-2">
                                <span className="w-2 h-2 bg-green-500 inline-block rounded-full mr-2"/>
                                <span className="font-bold text-green-500">Online</span>
                            </div>
                            <div className="mb-1">
                                <span className="font-semibold mr-1">Based in:</span>
                                <span>United States</span>
                            </div>
                            <div className="mb-1">
                                <span className="font-semibold mr-1">Timezone:</span>
                                <span>Eastern Time (US & Canada) (GMT-5)</span>
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold mr-1">Looking for:</span>
                                <span>Contracting work</span>
                            </div>

                            <div>
                                <button onClick={() => setShowContactForm(true)}
                                        className={Styles.button}>Contact
                                    me
                                </button>
                            </div>
                        </Card>
                        <Card>
                            <h2 className="text-2xl font-bold border-b pb-4 mb-4">Links</h2>
                            <div className="flex items-center gap-4 flex-wrap">
                                <SocialLink icon={<FaEnvelope/>} handle={"hello@charlesloubao.com"}
                                            url={"mailto:hello@charlesloubao.com"}/>
                                <SocialLink icon={<FaGithub/>} handle={"@charlesloubao"}
                                            url={"https://github.com/charlesloubao"}/>
                                <SocialLink icon={<FaYoutube/>} handle={"@charlesloubao"}
                                            url={"https://youtube.com/@charlesloubao"}/>
                                <SocialLink icon={<FaTwitter/>} handle={"@charlesloubao"}
                                            url={"https://twitter.com/charlesloubao"}/>
                            </div>
                        </Card>
                    </div>
                    <div className="md:w-2/3 md:pl-6 xl:p-0 xl:w-4/6 md:float-right">
                        <Card className="mb-4">
                            <h2 className="text-2xl font-bold border-b pb-4 mb-4">Summary</h2>
                            <p>
                                Hi! My name is Charles. I am a full-stack web developer with 3 years of experience
                                building
                                web
                                applications with React and Node.js.
                                When I am not writing code or building everything that comes to my mind I enjoy baking,
                                body building,
                                spending time with my dogs and cats and lawn care.
                            </p>
                        </Card>
                        <Card className="mb-4">
                            <h2 className="text-2xl font-bold border-b pb-4 mb-4">Skills and tools</h2>
                            <h3 className="text-lg font-bold mb-3">Top skills</h3>
                            <div className="mb-4 flex gap-3 flex-wrap">
                                {["React.js",
                                    "Node.js",
                                    "Javascript",
                                    "Typescript",
                                    "Flutter",
                                    "MongoDB",
                                    "MySQL",
                                    "PostgreSQL", "Firebase",
                                ].map(skill => (<Skill key={skill}>{skill}</Skill>))}
                            </div>

                            <h3 className="text-lg font-bold mb-3">Favorite cloud services</h3>
                            <div className="flex gap-3 flex-wrap mb-4">
                                {["DigitalOcean",
                                    "Vercel",
                                    "Heroku"].map(skill => (<Skill key={skill}>{skill}</Skill>))}
                            </div>

                            <h3 className="text-lg font-bold mb-3">IDE / Code Editor</h3>
                            <div className="flex gap-3 flex-wrap">
                                {["WebStorm", "Android Studio"
                                ].map(skill => (<Skill key={skill}>{skill}</Skill>))}
                            </div>

                        </Card>
                        <Card className="mb-4">
                            <h2 className="text-2xl font-bold border-b pb-4 mb-4">Featured Projects</h2>
                            <p>I am currently revamping my developer portfolio. Please come back later</p>
                        </Card>
                        <Card className="mb-4">
                            <h2 className="text-2xl font-bold border-b pb-4 mb-4">Fun facts</h2>
                            <h3 className="text-lg font-bold mb-3">What I&apos;m learning currently</h3>
                            <ul>
                                <li>Sharpening my mobile dev skills with Flutter</li>
                                <li>How to bake sourdough properly</li>
                            </ul>
                        </Card>

                    </div>
                </>
            </div>
        </main>

        <div ref={mobileCTARef}
             className="transition-transform -translate-y-full md:hidden fixed top-0 w-full border-b p-4 bg-white flex items-center justify-between">
            <div>
                <div className="font-bold uppercase">
                    Charles-Eugene Loubao
                </div>
                <div className="mb-2">
                    <span className="w-2 h-2 bg-green-500 inline-block rounded-full mr-2"/>
                    <span className="font-bold text-green-500">Online</span>
                </div>
            </div>
            <div>
                <button onClick={() => setShowContactForm(true)}
                        className={Styles.button}>Contact
                    me
                </button>
            </div>
        </div>

        {showContactForm && <div className="w-full h-full fixed bg-black top-0 left-0 bg-opacity-50 p-4">
            <div className="mx-auto md:w-2/5 xl:w-1/3 bg-white p-4 rounded-md max-h-full overflow-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Contact me</h1>
                    {formStatus !== "sending" &&
                        <button onClick={closeContactForm}><BiX size={32}/></button>}
                </div>

                {formStatus === "idle" && <form onSubmit={sendContactFormData}>
                    <div className={Styles.textField}>
                        <label className={Styles.label} htmlFor="Name">Name</label>
                        <input value={name} onChange={event => setName(event.target.value)} required
                               className={Styles.input} name="name" placeholder={"John Doe"}/>
                    </div>
                    <div className={Styles.textField}>
                        <label className={Styles.label} htmlFor="email">Email</label>
                        <input value={email} onChange={event => setEmail(event.target.value)} type="email" required
                               className={Styles.input} name="email"
                               placeholder={"john@acme.com"}/>
                    </div>
                    <div className={Styles.textField}>
                        <label className={Styles.label} htmlFor="subject">Subject</label>
                        <input value={subject} onChange={event => setSubject(event.target.value)} required
                               className={Styles.input} name="subject"
                               placeholder={"Build my app"}/>
                    </div>
                    <div className={Styles.textField}>
                        <label className={Styles.label} htmlFor="content">Message</label>
                        <textarea value={content} onChange={event => setContent(event.target.value)} required
                                  className={Styles.input} rows={10} name="content"
                                  placeholder={"How can I help you?"}/>
                    </div>
                    <input className={Styles.button} type="submit" value="Send"/>
                </form>
                }

                {formStatus === "sending" && <>
                    Sending your message...
                </>}

                {formStatus === "success" && <>
                    <p className="mb-4">I received your message! I will get back to you within 24 hours.</p>
                    <button onClick={closeContactForm} className={Styles.button}>Okay</button>
                </>}

                {formStatus === "error" && <>
                    <p className="mb-4">An error occurred please try again later</p>
                    <button onClick={closeContactForm} className={Styles.button}>Okay</button>
                </>}

            </div>
        </div>}

    </>
}

export default Home
