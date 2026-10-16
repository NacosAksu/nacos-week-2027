import FeatureStack from './FeatureStack';
import './features.css';

const WAVE = [8, 16, 26, 14, 30, 20, 10, 24, 32, 18, 12, 28, 16, 8, 22, 30, 14, 10, 20, 12];

/* The features section: a heading, then the cards in a FeatureStack. Each card is
   .fc-slide + a tint (fc-green, fc-sun, fc-pink, fc-sky, fc-mist, fc-lime, fc-white),
   the copy on the left, a coloured visual (.fv) on the right, and .fc-wash last. */
export default function FeaturesSection() {
  return (
    <section className="fs" id="features">
      <div className="fs-wrap">
        <div className="fs-head">
          <span className="eyebrow">Features</span>
          <h2>Everything Krait does, in one chat.</h2>
          <p className="sub">
            Move money, pay bills and check your balance by typing, talking or showing a screenshot. Seven things, one assistant. Scroll
            through.
          </p>
        </div>
        <FeatureStack>
          <article className="fc-slide fc-green" aria-label="Feature 1 of 7">
            <div className="feat-copy">
              <span className="feat-n num">01</span> <span className="mode-tag">Cash out</span>
              <h3>Cash out crypto to naira in seconds.</h3>
              <p className="sub">Send crypto, get naira in your bank. You see the rate and the total before you confirm.</p>
            </div>
            <div className="fv fv-green">
              <div className="chat">
                <div className="bub bub-user">Cash out $100</div>
                <div className="bub bub-krait">
                  {'Rate '}
                  <b className="num">₦1,470</b>
                  {'. You get '}
                  <b className="num">₦147,000</b>
                  {' to GTBank ••4821. Send the $100 to the details below.'}
                </div>
                <div className="bub bub-user">Sent ✓</div>
              </div>
              <div className="mini-receipt">
                <span className="eyebrow eyebrow-light">Receipt</span>
                <strong>Settled in 14 seconds</strong>
                <div className="mr-row">
                  <span>You received</span>
                  <b className="num">₦147,000</b>
                </div>
              </div>
            </div>
            <span className="fc-wash" aria-hidden="true" />
          </article>

          <article className="fc-slide fc-sun" aria-label="Feature 2 of 7">
            <div className="feat-copy">
              <span className="feat-n num">02</span> <span className="mode-tag">Buy crypto</span>
              <h3>Buy crypto with naira, without the runaround.</h3>
              <p className="sub">Tell Krait how much you want. Pay the account it shows. Krait sends the crypto where you choose.</p>
            </div>
            <div className="fv fv-sun">
              <div className="chat">
                <div className="bub bub-user">Buy $20</div>
                <div className="bub bub-krait">
                  {'$20 at '}
                  <b className="num">₦1,520</b>
                  {' is '}
                  <b className="num">₦30,400</b>
                  {', plus '}
                  <b className="num">₦150</b>
                  {' fee. Total '}
                  <b className="num">₦30,550</b>.
                </div>
              </div>
              <div className="paycard">
                <span className="eyebrow">Pay this account</span>
                <b className="num">Account shown in chat</b>
                <span className="paynote">Then Krait sends your $20 where you choose.</span>
              </div>
            </div>
            <span className="fc-wash" aria-hidden="true" />
          </article>

          <article className="fc-slide fc-pink" aria-label="Feature 3 of 7">
            <div className="feat-copy">
              <span className="feat-n num">03</span> <span className="mode-tag">Bill payments</span>
              <h3>Pay the bills that keep life running.</h3>
              <p className="sub">Airtime, data, electricity and TV, from the same chat you use for everything else.</p>
            </div>
            <div className="fv fv-bubble">
              <div className="tiles">
                <span>Airtime</span>
                <span>Data</span>
                <span>Electricity</span>
                <span>TV</span>
              </div>
              <div className="chat">
                <div className="bub bub-user">Buy ₦5,000 airtime</div>
                <div className="bub bub-krait">
                  {'₦5,000 airtime to '}
                  <b className="num">0803 ••• 4471</b>. Reply YES.
                </div>
              </div>
            </div>
            <span className="fc-wash" aria-hidden="true" />
          </article>

          <article className="fc-slide fc-sky" aria-label="Feature 4 of 7">
            <div className="feat-copy">
              <span className="feat-n num">04</span> <span className="mode-tag">Send naira</span>
              <h3>Send naira to anyone with a bank account.</h3>
              <p className="sub">Say who and how much. Krait confirms the name on the account before it goes.</p>
            </div>
            <div className="fv fv-sky">
              <div className="recip">
                <span className="avatar-n">C</span>
                <div>
                  <b>Chidi Okeke</b>
                  <span>
                    {'Access Bank · '}
                    <span className="num">••6789</span>
                  </span>
                </div>
              </div>
              <div className="chat">
                <div className="bub bub-user">Send ₦25,000 to Chidi</div>
                <div className="bub bub-krait">
                  {'Chidi Okeke, Access ••6789. Send '}
                  <b className="num">₦25,000</b>? Reply YES.
                </div>
              </div>
            </div>
            <span className="fc-wash" aria-hidden="true" />
          </article>

          <article className="fc-slide fc-mist" aria-label="Feature 5 of 7">
            <div className="feat-copy">
              <span className="feat-n num">05</span> <span className="mode-tag">Chat</span>
              <h3>Your money, in the chat you already use.</h3>
              <p className="sub">Krait lives on Telegram and WhatsApp. Ask for your balance, your history or what you received. It answers in seconds.</p>
            </div>
            <div className="fv fv-night">
              <div className="chan-row">
                <span className="chip chip-green">Telegram</span>
                <span className="chip chip-green">WhatsApp</span>
              </div>
              <div className="pills">
                <span>Balance?</span>
                <span>What did I receive?</span>
                <span>Last 5 transactions</span>
                <span>Buy $20</span>
              </div>
              <div className="chat">
                <div className="bub bub-user">Balance?</div>
                <div className="bub bub-krait">
                  {'You have '}
                  <b className="num">₦48,200</b>
                  {' in your Krait wallet.'}
                </div>
              </div>
            </div>
            <span className="fc-wash" aria-hidden="true" />
          </article>

          <article className="fc-slide fc-lime" aria-label="Feature 6 of 7">
            <div className="feat-copy">
              <span className="feat-n num">06</span> <span className="mode-tag">Voice notes</span>
              <h3>Say it. Krait listens.</h3>
              <p className="sub">Not in the mood to type? Send a voice note. Krait turns it into a request and checks it back with you.</p>
            </div>
            <div className="fv fv-lime">
              <div className="voice">
                <span className="play">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
                <span className="wave" aria-hidden="true">
                  {WAVE.map((h, i) => (
                    <i key={i} style={{ height: h + 'px' }} />
                  ))}
                </span>
                <span className="num t">0:07</span>
              </div>
              <p className="transcript">
                <span className="eyebrow">Krait heard</span>“Cash out fifty dollars to my GTBank.”
              </p>
              <div className="chat">
                <div className="bub bub-krait">
                  {'$50 to GTBank ••4821. You get '}
                  <b className="num">₦73,500</b>. Reply YES.
                </div>
              </div>
            </div>
            <span className="fc-wash" aria-hidden="true" />
          </article>

          <article className="fc-slide fc-white" aria-label="Feature 7 of 7">
            <div className="feat-copy">
              <span className="feat-n num">07</span> <span className="mode-tag">Image recognition</span>
              <h3>Show it. Krait reads it.</h3>
              <p className="sub">
                Take a screenshot of someone's account details and send it. Krait reads the name, bank and number so you do not have to retype
                them.
              </p>
            </div>
            <div className="fv fv-mist">
              <div className="scan">
                <i className="c tl" />
                <i className="c tr" />
                <i className="c bl" />
                <i className="c br" />
                <div className="scan-row">
                  <span>Account name</span>
                  <b>Chidi Okeke</b>
                </div>
                <div className="scan-row">
                  <span>Bank</span>
                  <b>Access Bank</b>
                </div>
                <div className="scan-row">
                  <span>Number</span>
                  <b className="num">0123 456 789</b>
                </div>
              </div>
              <div className="chat">
                <div className="bub bub-krait">Read it. Chidi Okeke, Access Bank. How much do you want to send?</div>
              </div>
            </div>
            <span className="fc-wash" aria-hidden="true" />
          </article>
        </FeatureStack>
      </div>
    </section>
  );
}
