import Header from '../components/Header'

export default function Resources() {
    return (
        <div>
            <Header />
            <div className="page-body resources">
                <div className="section-header">
                    <h1>Hotlines</h1>
                    <h2>
                        Save these numbers in your contacts in case of emergency
                    </h2>
                </div>
                <div className="is-flex">
                    <label className="label">
                        Philadelphia Arrest Hotline:
                    </label>
                    <p>484-758-0388</p>
                </div>
                <div className="is-flex">
                    <label className="label">Mental Illness Hotline:</label>
                    <p>1-800-950-6264</p>
                </div>
                <div className="is-flex">
                    <label className="label">
                        National Suicide Prevention Lifeline:
                    </label>
                    <p>800-273-8255</p>
                </div>
                <div className="section-header">
                    <h1>Links</h1>
                </div>
                <a
                    target="_blank"
                    href="https://www.aclunc.org/our-work/know-your-rights/know-your-rights-free-speech-protests-demonstrations"
                >
                    Know Your Rights
                </a>
                <a target="_blank" href="https://www.nlg.org/">
                    National Lawyer's Guild
                </a>
                <a
                    target="_blank"
                    href="https://www.amnestyusa.org/pdfs/SafeyDuringProtest_F.pdf"
                >
                    Safety During Protest
                </a>
            </div>
        </div>
    )
}
