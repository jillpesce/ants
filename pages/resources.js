import Header from '../components/Header'
import styles from './styles/Resources.module.css'

export default function Resources() {
  return (
    <div>
      <Header />
      <h1>Resources</h1>
      <div class="card">
        <div class="card-header">
          Hotlines
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Philadelphia Arrest Hotline: 484-758-0388</li>
          <li class="list-group-item">Mental Illness Hotline: 1-800-950-6264</li>
          <li class="list-group-item">National Suicide Prevention Lifeline: 800-273-8255</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header">
          Important Links
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><a target='_blank' className={styles.a}
            href="https://www.aclunc.org/our-work/know-your-rights/know-your-rights-free-speech-protests-demonstrations">
            Know Your Rights</a></li>
          <li class="list-group-item"><a target='_blank' className={styles.a}
            href="https://www.nlg.org/"> National Lawyer's Guild</a></li>
          <li class="list-group-item"><a target='_blank' className={styles.a}
            href="https://www.amnestyusa.org/pdfs/SafeyDuringProtest_F.pdf"> Safety During Protest</a></li>
        </ul>
      </div>
    </div>
  )
}
