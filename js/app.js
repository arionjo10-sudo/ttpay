/* UPI-style payments app concept for Trinidad and Tobago. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Icons (24px grid, stroke only)                                      */
  /* ------------------------------------------------------------------ */
  const ICON = {
    scan: 'M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M4 12h16',
    send: 'M7 17L17 7M8 7h9v9',
    request: 'M17 7L7 17M16 17H7V8',
    qr: 'M4 4h6v6H4V4zM14 4h6v6h-6V4zM4 14h6v6H4v-6zM14 14h2v2h-2zM18 14h2M14 18h2v2h4',
    receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6',
    phone: 'M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3zM11 18h2',
    repeat: 'M4 11V9a3 3 0 0 1 3-3h11l-3-3M20 13v2a3 3 0 0 1-3 3H6l3 3',
    history: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
    bolt: 'M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z',
    drop: 'M12 3.5s6 6.2 6 10.3a6 6 0 0 1-12 0C6 9.7 12 3.5 12 3.5z',
    wifi: 'M3.5 9.5a12 12 0 0 1 17 0M6.5 12.5a8 8 0 0 1 11 0M9.5 15.5a4 4 0 0 1 5 0M12 19h.01',
    shield: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z',
    cap: 'M2 9l10-5 10 5-10 5L2 9zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',
    doc: 'M7 3h7l4 4v14H7V3zM14 3v4h4M10 12h5M10 16h5',
    bank: 'M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
    eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zM12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    eyeOff: 'M4 4l16 16M9.9 5.8A9.8 9.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-3 3.8M6.2 7.8A16 16 0 0 0 2.5 12S6 18.5 12 18.5c1.4 0 2.6-.3 3.7-.8',
    home: 'M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9z',
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20c.8-3.6 3.7-5.5 7.5-5.5s6.7 1.9 7.5 5.5',
    back: 'M15 5l-7 7 7 7',
    close: 'M6 6l12 12M18 6L6 18',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    backspace: 'M20 5H9l-6 7 6 7h11a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM15 9.5l-4 5M11 9.5l4 5'
  };
  const svg = (name, size = 24, sw = 1.75) =>
    `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"><path d="${ICON[name]}"/></svg>`;

  /* ------------------------------------------------------------------ */
  /* Sample data                                                         */
  /* ------------------------------------------------------------------ */
  const TINTS = [['#D6EEEA', '#0A5551'], ['#FBDFDC', '#8E1822'], ['#FBEBC0', '#6E4A00'], ['#DDE4F7', '#27367A'], ['#E8DDF3', '#4B2A73']];
  const tint = (t) => TINTS[t % TINTS.length];

  const ME = { name: 'Amara Joseph', first: 'Amara', pid: 'amara.joseph@ttpay', phone: '+1 868 555 0142' };
  const BANK = 'First Savannah Bank ••4821';

  const CONTACTS = [
    { name: 'Ravi Maharaj', first: 'Ravi', init: 'RM', pid: 'ravi.maharaj@ttpay', phone: '+1 868 342 7716', t: 0 },
    { name: 'Shanice Baptiste', first: 'Shanice', init: 'SB', pid: 'shanice.b@ttpay', phone: '+1 868 718 2290', t: 1 },
    { name: 'Marcia Alexander', first: 'Mum', init: 'MA', pid: 'marcia.alexander@ttpay', phone: '+1 868 623 4408', t: 2 },
    { name: 'Kerwin Joseph', first: 'Kerwin', init: 'KJ', pid: 'kerwin.j@ttpay', phone: '+1 868 290 5531', t: 3 },
    { name: 'Nadia Ali', first: 'Nadia', init: 'NA', pid: 'nadia.ali@ttpay', phone: '+1 868 475 1062', t: 4 },
    { name: "Chef Dee's Roti Shop", first: 'Chef Dee', init: 'CD', pid: 'chefdee@ttpay', phone: '+1 868 657 3318', t: 1, kind: 'merchant' }
  ];

  const SEED_TXNS = [
    { name: "Aunty Ramdhanie's Doubles", init: 'AR', sub: 'Doubles x6', amt: -30, day: 'Today', time: '6:42 PM', kind: 'sent', t: 2 },
    { name: 'Shanice Baptiste', init: 'SB', sub: 'Lime split, Maracas', amt: 250, day: 'Today', time: '1:15 PM', kind: 'received', t: 1 },
    { name: 'T&TEC', init: 'TT', sub: 'Electricity · September', amt: -389.4, day: 'Yesterday', time: '9:03 AM', kind: 'bill', t: 3 },
    { name: 'Route taxi', init: 'RT', sub: 'Port of Spain to Arima', amt: -12, day: 'Yesterday', time: '7:48 AM', kind: 'sent', t: 0 },
    { name: 'Marcia Alexander', init: 'MA', sub: 'For groceries', amt: -500, day: 'Mon 12 Oct', time: '5:30 PM', kind: 'sent', t: 2 },
    { name: 'Mobile top-up', init: 'MT', sub: 'Prepaid · +1 868 555 0142', amt: -100, day: 'Sun 11 Oct', time: '10:12 AM', kind: 'bill', t: 0 },
    { name: 'Kerwin Joseph', init: 'KJ', sub: 'Fete ticket share', amt: 80, day: 'Sat 10 Oct', time: '11:40 PM', kind: 'received', t: 3 },
    { name: "Chef Dee's Roti Shop", init: 'CD', sub: 'Chicken roti x2', amt: -90, day: 'Fri 9 Oct', time: '12:26 PM', kind: 'sent', t: 1 }
  ];

  const BILLS_DUE = [
    { id: 'ttec', name: 'T&TEC', sub: 'Electricity · Acct ••5521', due: 'Due in 7 days', amt: 412.6, icon: 'bolt', pid: 'Electricity · Acct ••5521', init: 'TT', t: 3 },
    { id: 'wasa', name: 'WASA', sub: 'Water · Acct ••3087', due: 'Due in 13 days', amt: 138, icon: 'drop', pid: 'Water · Acct ••3087', init: 'WA', t: 0 }
  ];

  const CATEGORIES = [
    { label: 'Electricity', icon: 'bolt', name: 'T&TEC', pid: 'Electricity · Acct ••5521', init: 'TT', t: 3 },
    { label: 'Water', icon: 'drop', name: 'WASA', pid: 'Water · Acct ••3087', init: 'WA', t: 0 },
    { label: 'Mobile', icon: 'phone', name: 'Mobile top-up', pid: ME.phone, init: 'MT', t: 0 },
    { label: 'Internet & TV', icon: 'wifi', name: 'Internet & TV', pid: 'Home broadband', init: 'IT', t: 4 },
    { label: 'Insurance', icon: 'shield', name: 'Insurance premium', pid: 'Policy ••1190', init: 'IP', t: 1 },
    { label: 'School fees', icon: 'cap', name: 'School fees', pid: 'Student ID ••204', init: 'SF', t: 2 },
    { label: 'Taxes', icon: 'doc', name: 'Inland Revenue', pid: 'Taxpayer ••7731', init: 'IR', t: 3 },
    { label: 'Loans', icon: 'bank', name: 'Loan repayment', pid: 'Loan ••6642', init: 'LR', t: 4 }
  ];

  const SPEND = [
    { label: 'Bills', amt: 1890, color: 'var(--ink)' },
    { label: 'Food', amt: 1126.5, color: 'var(--accent)' },
    { label: 'Family', amt: 800, color: '#0B7A75' },
    { label: 'Transport', amt: 419.5, color: '#E8A317' }
  ];

  const MERCHANT_SCAN = { name: "Aunty Ramdhanie's Doubles", pid: 'ramdhanie.doubles@ttpay', init: 'AR', t: 2, kind: 'merchant' };

  /* ------------------------------------------------------------------ */
  /* State                                                               */
  /* ------------------------------------------------------------------ */
  const STORE_KEY = 'ttpay-demo-v1';
  const clone = (x) => JSON.parse(JSON.stringify(x));

  function defaults() {
    return {
      screen: 'home', mode: 'send', back: 'home', hide: false, q: '', payee: null,
      amount: '', note: '', pin: '', filter: 'all', last: null, copied: false,
      balance: 12480.5, txns: clone(SEED_TXNS), paid: []
    };
  }

  function load() {
    const s = defaults();
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (typeof d.balance === 'number') s.balance = d.balance;
        if (Array.isArray(d.txns)) s.txns = d.txns;
        if (Array.isArray(d.paid)) s.paid = d.paid;
      }
    } catch (e) { /* storage unavailable: run in memory */ }
    return s;
  }

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ balance: S.balance, txns: S.txns, paid: S.paid }));
    } catch (e) { /* ignore */ }
  }

  let S = load();
  const app = document.getElementById('app');

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dispAmount = (a) => {
    if (!a) return '0';
    const parts = a.split('.');
    const ip = Number(parts[0] || '0').toLocaleString('en-US');
    return parts.length > 1 ? ip + '.' + parts[1] : ip;
  };
  const avatar = (init, t, cls = '') => {
    const c = tint(t);
    return `<span class="avatar ${cls}" style="background:${c[0]};color:${c[1]}">${esc(init)}</span>`;
  };
  const payeeOf = (c) => ({ name: c.name, pid: c.pid, init: c.init, t: c.t, kind: c.kind || 'person' });
  const nowStrings = () => {
    const d = new Date();
    const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const date = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + time;
    return { time, date };
  };

  function setState(patch) {
    Object.assign(S, patch);
    render();
  }

  function pickPayee(p, amount, mode) {
    setState({ payee: p, amount: amount || '', note: '', pin: '', back: S.screen, screen: 'amount', mode: mode || S.mode });
  }

  /* ------------------------------------------------------------------ */
  /* Views                                                               */
  /* ------------------------------------------------------------------ */
  function txnRow(x, prev, withDay) {
    const dayHead = withDay && (!prev || prev.day !== x.day) ? `<h2 class="eyebrow day">${esc(x.day)}</h2>` : '';
    const pos = x.amt > 0;
    return `${dayHead}
      <div class="row">
        ${avatar(x.init, x.t)}
        <div class="main"><span class="name">${esc(x.name)}</span><span class="sub">${esc(x.sub)} · ${esc(x.time)}</span></div>
        <span class="amt ${pos ? 'pos' : ''}">${pos ? '+' : '−'}TT$ ${fmt(Math.abs(x.amt))}</span>
      </div>`;
  }

  function viewHome() {
    const h = new Date().getHours();
    const greet = (h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening') + ', ' + ME.first;
    const spendTotal = SPEND.reduce((a, b) => a + b.amt, 0);
    const actions = [
      ['Scan & Pay', 'scan', 'go', 'scan', true],
      ['Send', 'send', 'send', 'send'],
      ['Request', 'request', 'send', 'request'],
      ['My QR', 'qr', 'go', 'me'],
      ['Pay bills', 'receipt', 'go', 'bills'],
      ['Top-up', 'phone', 'topup', ''],
      ['Self transfer', 'repeat', 'selftransfer', ''],
      ['Activity', 'history', 'go', 'history']
    ].map((a) => `
      <button type="button" class="act pr" data-act="${a[2]}" data-arg="${a[3]}">
        <span class="tile ${a[4] ? 'primary' : ''}">${svg(a[1])}</span>
        <span class="label">${esc(a[0])}</span>
      </button>`).join('');
    const people = CONTACTS.map((c, i) => `
      <button type="button" class="person pr" data-act="sendAgain" data-arg="${i}">
        ${avatar(c.init, c.t, 'lg')}<span class="n">${esc(c.first)}</span>
      </button>`).join('');
    const bar = SPEND.map((s) => `<i style="flex:${s.amt} 1 0;background:${s.color}"></i>`).join('');
    const legend = SPEND.map((s) => `<div><i style="background:${s.color}"></i><span>${esc(s.label)}</span><b>TT$ ${fmt(s.amt)}</b></div>`).join('');
    const recent = S.txns.slice(0, 4).map((x) => txnRow(x, null, false)).join('');

    return `
    <div class="screen">
      <div class="topbar">
        <div>
          <div class="brand"><i></i>TTPay</div>
          <div class="greet">${esc(greet)}</div>
        </div>
        <button type="button" class="me-btn pr" data-act="go" data-arg="me" aria-label="Open my profile and QR code">AJ</button>
      </div>

      <section class="hero" aria-label="Account balance">
        <svg class="rings" aria-hidden="true" viewBox="0 0 260 260" width="260" height="260" fill="none" stroke="#F2B632" stroke-opacity="0.3" stroke-width="1.5">
          <circle cx="130" cy="130" r="122"/><circle cx="130" cy="130" r="108"/>
          <ellipse cx="130" cy="68" rx="30" ry="22"/>
          <ellipse cx="130" cy="68" rx="30" ry="22" transform="rotate(72 130 130)"/>
          <ellipse cx="130" cy="68" rx="30" ry="22" transform="rotate(144 130 130)"/>
          <ellipse cx="130" cy="68" rx="30" ry="22" transform="rotate(216 130 130)"/>
          <ellipse cx="130" cy="68" rx="30" ry="22" transform="rotate(288 130 130)"/>
          <circle cx="130" cy="130" r="26"/>
        </svg>
        <div class="hero-top">
          <span class="hero-label">Available balance</span>
          <button type="button" class="eye pr" data-act="toggleHide" aria-label="${S.hide ? 'Show balance' : 'Hide balance'}">${svg(S.hide ? 'eyeOff' : 'eye', 22)}</button>
        </div>
        <div class="hero-amt"><span class="cur">TT$</span><span class="num">${S.hide ? '••••••' : fmt(S.balance)}</span></div>
        <div class="hero-foot">
          <span class="acct-chip">${svg('bank', 16)}${esc(BANK)}</span>
          <span class="gold">Instant · 24/7 · TT$0 fees</span>
        </div>
      </section>

      <section class="actions" aria-label="Quick actions">${actions}</section>

      <section aria-label="Send again">
        <h2 class="h2" style="margin-bottom:8px">Send again</h2>
        <div class="people">${people}</div>
      </section>

      <section class="spend" aria-label="Spending this month">
        <div>
          <div class="muted" style="font-size:13px;font-weight:500">Spent in October</div>
          <div class="total">TT$ ${fmt(spendTotal)}</div>
        </div>
        <div class="bar">${bar}</div>
        <div class="legend">${legend}</div>
      </section>

      <section class="section" aria-label="Recent activity">
        <div class="row-head">
          <h2 class="h2">Recent activity</h2>
          <button type="button" class="link pr" data-act="go" data-arg="history">See all</button>
        </div>
        ${recent}
      </section>
    </div>`;
  }

  function viewScan() {
    return `
    <div class="scan dark">
      <div class="bar-top">
        <button type="button" class="close pr" data-act="back" aria-label="Close scanner">${svg('close', 22)}</button>
        <h1>Scan &amp; Pay</h1>
        <span style="width:44px"></span>
      </div>
      <div class="mid">
        <button type="button" class="finder" data-act="simulateScan" aria-label="Simulate scanning a Pay QR code">
          <span class="c tl"></span><span class="c tr"></span><span class="c bl"></span><span class="c br"></span>
          <span class="line"></span>
          <span class="hint">Tap the frame to simulate a scan</span>
        </button>
        <div>
          <div class="t1">Point at any Pay QR</div>
          <div class="t2">Shops, maxi stands, markets and friends. Instant, TT$0 fees.</div>
        </div>
      </div>
      <div class="foot">
        <button type="button" class="pr" data-act="go" data-arg="me">${svg('qr', 20)}My QR</button>
        <button type="button" class="pr solid" data-act="send" data-arg="send">${svg('search', 20)}Pay ID or number</button>
      </div>
    </div>`;
  }

  function sendResults() {
    const ql = S.q.trim().toLowerCase();
    const qd = ql.replace(/\s/g, '');
    const matches = CONTACTS.map((c, i) => ({ c, i })).filter(({ c }) =>
      !ql || c.name.toLowerCase().includes(ql) || c.pid.includes(ql) || (qd.length > 2 && c.phone.replace(/\s/g, '').includes(qd)));
    const looksId = ql.includes('@') || qd.replace(/\D/g, '').length >= 7;
    const hasManual = ql.length > 2 && looksId && matches.length === 0;

    const manual = hasManual ? `
      <button type="button" class="row new-payee pr" data-act="manual">
        <span class="avatar">${svg('send', 20)}</span>
        <span class="main"><span class="name">${esc((S.mode === 'request' ? 'Request from ' : 'Pay ') + S.q.trim())}</span><span class="sub">New payee. Check the details before you send.</span></span>
      </button>` : '';
    const list = matches.map(({ c, i }) => `
      <button type="button" class="row pr" data-act="pickContact" data-arg="${i}">
        ${avatar(c.init, c.t)}
        <span class="main"><span class="name">${esc(c.name)}</span><span class="sub">${esc(c.pid)} · ${esc(c.phone)}</span></span>
      </button>`).join('');
    const none = !matches.length && !hasManual
      ? '<div class="empty">No contact found. Type a full Pay ID like name@ttpay or a mobile number starting with +1 868.</div>' : '';
    return `${manual}
      <section class="section"><h2 class="eyebrow">Contacts</h2>${list}${none}</section>`;
  }

  function header(title) {
    return `<div class="head">
      <button type="button" class="back pr" data-act="back" aria-label="Back">${svg('back')}</button>
      <h1>${esc(title)}</h1>
    </div>`;
  }

  function viewSend() {
    return `
    <div class="screen flush">
      ${header(S.mode === 'request' ? 'Request money' : 'Send money')}
      <div class="body">
        <label class="field">
          ${svg('search', 20)}
          <input id="send-q" type="text" autocomplete="off" aria-label="Search contacts, Pay ID or mobile number" placeholder="Name, Pay ID or mobile number" value="${esc(S.q)}">
        </label>
        <div id="send-results" class="stack" style="gap:14px">${sendResults()}</div>
      </div>
    </div>`;
  }

  function viewAmount() {
    const p = S.payee || { name: '', pid: '', init: '', t: 0, kind: 'person' };
    const amt = parseFloat(S.amount) || 0;
    const isReq = S.mode === 'request';
    const over = !isReq && amt > S.balance;
    const disabled = amt <= 0 || over;
    const title = isReq ? 'Request money' : (p.kind === 'biller' ? 'Pay bill' : 'Send money');
    const label = amt <= 0 ? 'Enter an amount' : (isReq ? 'Request TT$ ' : 'Pay TT$ ') + fmt(amt);
    const quick = [50, 100, 200].map((v) => `<button type="button" class="pill pr" data-act="quick" data-arg="${v}">+${v}</button>`).join('');
    return `
    <div class="screen flush">
      ${header(title)}
      <div class="body" style="padding-top:4px">
        <div class="row">
          ${avatar(p.init, p.t, 'lg')}
          <div class="main"><span class="name" style="font-size:16px;font-weight:700">${esc(p.name)}</span><span class="sub">${esc(p.pid)}</span></div>
        </div>
        <div class="amount-big"><span class="cur">TT$</span><span class="num">${dispAmount(S.amount)}</span></div>
        <div class="quick">${quick}</div>
        <label class="field sm">
          <input id="pay-note" type="text" maxlength="40" autocomplete="off" aria-label="Add a note" placeholder="Add a note (optional)" value="${esc(S.note)}">
        </label>
        <div class="from">
          <span class="ic">${svg('bank', 18)}</span>
          <div>
            <b>${isReq ? 'Money goes to ' + esc(BANK) : 'From ' + esc(BANK)}</b>
            <small>${isReq ? 'They get a request to approve in their app' : 'Balance TT$ ' + fmt(S.balance) + ' · Instant · TT$0 fee'}</small>
          </div>
        </div>
        ${over ? '<div class="alert" role="alert">That is more than your available balance. Lower the amount to continue.</div>' : ''}
        <button type="button" class="btn pr" data-act="pay" ${disabled ? 'disabled' : ''}>${label}</button>
      </div>
    </div>`;
  }

  function viewPin() {
    const p = S.payee || { name: '', init: '', t: 0 };
    const dots = [0, 1, 2, 3, 4, 5].map((i) => `<i class="${i < S.pin.length ? 'on' : ''}"></i>`).join('');
    return `
    <div class="screen flush">
      ${header('Enter Pay PIN')}
      <div class="pin-wrap">
        ${avatar(p.init, p.t, 'xl')}
        <div>
          <div class="muted" style="font-size:14px;margin-bottom:6px">Paying ${esc(p.name)}</div>
          <div class="pin-amt">TT$ ${fmt(parseFloat(S.amount) || 0)}</div>
        </div>
        <div class="pin-dots" role="img" aria-label="${S.pin.length} of 6 digits entered">${dots}</div>
        <span class="small-note">Prototype: type any 6 digits. A real Pay PIN would be checked by your bank.</span>
      </div>
    </div>`;
  }

  function viewDone() {
    const l = S.last || { name: '', pid: '', amt: 0, date: '', ref: '', mode: 'send' };
    const isReq = l.mode === 'request';
    const rows = isReq
      ? [['To', l.name], ['Pay ID', l.pid], ['Status', 'Waiting for approval'], ['Date', l.date], ['Reference no.', l.ref]]
      : [['To', l.name], ['Pay ID', l.pid], ['From', BANK], ['Date', l.date], ['Reference no.', l.ref], ['Fee', 'TT$ 0.00 · Instant']];
    return `
    <div class="screen" style="padding-top:32px">
      <div class="done-top">
        <span class="check">${svg('check', 44, 2.25)}</span>
        <h1>${isReq ? 'Request sent' : 'Payment successful'}</h1>
        <span class="done-amt">TT$ ${fmt(l.amt)}</span>
        <span class="muted" style="overflow-wrap:anywhere">${isReq ? 'Requested from ' : 'Paid to '}${esc(l.name)}</span>
      </div>
      <div class="details">${rows.map((r) => `<div><span>${esc(r[0])}</span><span>${esc(r[1])}</span></div>`).join('')}</div>
      <div class="spacer"></div>
      <div class="stack" style="gap:10px">
        <button type="button" class="btn pr" data-act="finish">Done</button>
        <button type="button" class="btn ghost pr" data-act="again">${isReq ? 'Request again' : 'Send another'}</button>
      </div>
    </div>`;
  }

  function viewBills() {
    const due = BILLS_DUE.filter((b) => !S.paid.includes(b.id));
    const dueHtml = due.map((b) => `
      <div class="bill">
        <span class="ic">${svg(b.icon)}</span>
        <span class="mid"><b>${esc(b.name)}</b><small>${esc(b.sub)}</small><span class="due">${esc(b.due)}</span></span>
        <span class="end"><b>TT$ ${fmt(b.amt)}</b><button type="button" class="pay-sm pr" data-act="payBill" data-arg="${b.id}" aria-label="Pay ${esc(b.name)} bill">Pay</button></span>
      </div>`).join('') || '<div class="empty">All caught up. No bills are due right now.</div>';
    const cats = CATEGORIES.map((c, i) => `
      <button type="button" class="act pr" data-act="cat" data-arg="${i}">
        <span class="tile">${svg(c.icon)}</span><span class="label">${esc(c.label)}</span>
      </button>`).join('');
    return `
    <div class="screen">
      <h1 class="page-title">Bills &amp; recharge</h1>
      <section class="section"><h2 class="eyebrow">Due soon</h2>${dueHtml}</section>
      <section class="section"><h2 class="eyebrow">All categories</h2><div class="actions">${cats}</div></section>
    </div>`;
  }

  function viewHist() {
    const list = S.txns.filter((x) => S.filter === 'all' || x.kind === S.filter);
    const chips = [['all', 'All'], ['sent', 'Sent'], ['received', 'Received'], ['bill', 'Bills']].map((f) =>
      `<button type="button" class="chip pr" data-act="filter" data-arg="${f[0]}" aria-pressed="${S.filter === f[0]}">${f[1]}</button>`).join('');
    const rows = list.map((x, i) => txnRow(x, list[i - 1], true)).join('') || '<div class="empty">Nothing here yet.</div>';
    return `
    <div class="screen" style="gap:14px">
      <h1 class="page-title">Activity</h1>
      <div class="chips">${chips}</div>
      <div class="stack">${rows}</div>
    </div>`;
  }

  function qrCells() {
    const n = 25;
    let seed = 11;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    let out = '';
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const finder = (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
        const zone = (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
        let on = false;
        if (finder) {
          const fx = x >= n - 7 ? x - (n - 7) : x;
          const fy = y >= n - 7 ? y - (n - 7) : y;
          const ring = Math.max(Math.abs(fx - 3), Math.abs(fy - 3));
          on = ring === 3 || ring <= 1;
        } else if (!zone) {
          on = rnd() > 0.5;
        }
        if (on) out += `<i style="left:${x * 8}px;top:${y * 8}px"></i>`;
      }
    }
    return out;
  }

  function viewMe() {
    return `
    <div class="screen">
      <h1 class="page-title">My Pay QR</h1>
      <section class="qr-card">
        <div class="qr-frame"><div class="qr" role="img" aria-label="Your TTPay QR code">${qrCells()}<span class="logo"><b></b></span></div></div>
        <div style="text-align:center"><div class="qr-name">${esc(ME.name)}</div><div class="muted" style="font-size:14px">${esc(ME.phone)}</div></div>
        <div class="pid"><span>${esc(ME.pid)}</span><button type="button" class="pr" data-act="copy">${S.copied ? 'Copied' : 'Copy'}</button></div>
        <span class="tiny" style="max-width:260px;font-size:13px">Show this to get paid. Anyone with TTPay can scan it and send TT$ instantly.</span>
      </section>
      <section class="section">
        <h2 class="eyebrow">Linked accounts</h2>
        <div class="row">
          <span class="avatar" style="border-radius:14px;background:#D6EEEA;color:#0A5551">${svg('bank', 22)}</span>
          <div class="main"><span class="name">${esc(BANK)}</span><span class="sub">Savings · TT$ ${fmt(S.balance)}</span></div>
          <span class="badge">Primary</span>
        </div>
        <div class="row">
          <span class="avatar" style="border-radius:14px;background:var(--tile)">${svg('bank', 22)}</span>
          <div class="main"><span class="name">Trinity Co-op Credit Union ••9034</span><span class="sub">Savings · used for self transfers</span></div>
        </div>
      </section>
      <button type="button" class="reset" data-act="reset">Reset demo data</button>
      <span class="tiny">TTPay is a concept design with sample data. It is not a real bank or payment service.</span>
    </div>`;
  }

  function keypad() {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'b'].map((k) => {
      const off = k === '.' && S.screen === 'pin' ? ' off' : '';
      const aria = k === 'b' ? 'Delete' : (k === '.' ? 'Decimal point' : k);
      return `<button type="button" class="key${off}" data-act="key" data-arg="${k}" aria-label="${aria}">${k === 'b' ? svg('backspace', 26) : k}</button>`;
    }).join('');
    return `<div class="keypad">${keys}</div>`;
  }

  function tabbar() {
    const tab = (screen, icon, label) =>
      `<button type="button" class="tab pr ${S.screen === screen ? 'on' : ''}" data-act="go" data-arg="${screen}">${svg(icon)}<span>${label}</span></button>`;
    return `<nav class="tabbar" aria-label="Main">
      ${tab('home', 'home', 'Home')}
      ${tab('bills', 'receipt', 'Bills')}
      <button type="button" class="fab pr" data-act="go" data-arg="scan" aria-label="Scan and pay">${svg('scan', 28, 1.9)}</button>
      ${tab('history', 'history', 'Activity')}
      ${tab('me', 'user', 'Me')}
    </nav>`;
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */
  const VIEWS = { home: viewHome, scan: viewScan, send: viewSend, amount: viewAmount, pin: viewPin, done: viewDone, bills: viewBills, history: viewHist, me: viewMe };
  const TAB_SCREENS = ['home', 'bills', 'history', 'me'];
  let lastScreen = null;

  function render() {
    const prev = app.querySelector('.screen');
    const top = prev && lastScreen === S.screen ? prev.scrollTop : 0;
    const keys = S.screen === 'amount' || S.screen === 'pin';
    app.innerHTML = VIEWS[S.screen]() + (keys ? keypad() : '') + (TAB_SCREENS.includes(S.screen) ? tabbar() : '');
    const el = app.querySelector('.screen');
    if (el && top) el.scrollTop = top;
    lastScreen = S.screen;
  }

  /* ------------------------------------------------------------------ */
  /* Actions                                                             */
  /* ------------------------------------------------------------------ */
  function pressKey(k) {
    if (S.screen === 'pin') {
      if (k === 'b') return setState({ pin: S.pin.slice(0, -1) });
      if (k === '.' || S.pin.length >= 6) return;
      const pin = S.pin + k;
      setState({ pin });
      if (pin.length === 6) completePayment();
      return;
    }
    let a = S.amount;
    if (k === 'b') {
      a = a.slice(0, -1);
    } else if (k === '.') {
      if (a.includes('.')) return;
      a = (a === '' ? '0' : a) + '.';
    } else {
      if (a.includes('.') && a.split('.')[1].length >= 2) return;
      if (a === '0') a = k;
      else if (a.replace('.', '').length >= 7) return;
      else a += k;
    }
    setState({ amount: a });
  }

  function completePayment() {
    setTimeout(() => {
      const p = S.payee;
      if (!p) return;
      const amt = parseFloat(S.amount) || 0;
      const { time, date } = nowStrings();
      const tx = {
        name: p.name, init: p.init, t: p.t, amt: -amt, day: 'Today', time,
        kind: p.kind === 'biller' ? 'bill' : 'sent',
        sub: S.note || (p.kind === 'biller' ? 'Bill payment' : 'Payment')
      };
      S.balance = Math.round((S.balance - amt) * 100) / 100;
      S.txns = [tx].concat(S.txns);
      if (p.billId) S.paid = S.paid.concat(p.billId);
      save();
      setState({ last: { name: p.name, pid: p.pid, amt, date, ref: String(Date.now()).slice(-12), mode: 'send' }, screen: 'done', pin: '' });
    }, 320);
  }

  function submitAmount() {
    const amt = parseFloat(S.amount) || 0;
    if (amt <= 0) return;
    if (S.mode === 'request') {
      const { date } = nowStrings();
      setState({ last: { name: S.payee.name, pid: S.payee.pid, amt, date, ref: String(Date.now()).slice(-12), mode: 'request' }, screen: 'done' });
    } else if (amt <= S.balance) {
      setState({ screen: 'pin', pin: '' });
    }
  }

  const ACTIONS = {
    go: (arg) => setState({ screen: arg, q: '' }),
    send: (arg) => setState({ screen: 'send', mode: arg || 'send', q: '' }),
    back: () => setState({ screen: ({ amount: S.back || 'home', pin: 'amount' })[S.screen] || 'home', pin: '' }),
    toggleHide: () => setState({ hide: !S.hide }),
    sendAgain: (arg) => pickPayee(payeeOf(CONTACTS[+arg]), '', 'send'),
    pickContact: (arg) => pickPayee(payeeOf(CONTACTS[+arg]), '', S.mode),
    manual: () => pickPayee({ name: S.q.trim(), pid: 'New payee', init: '+', t: 4, kind: 'person' }, '', S.mode),
    simulateScan: () => pickPayee(MERCHANT_SCAN, '', 'send'),
    topup: () => pickPayee({ name: 'Mobile top-up', pid: ME.phone, init: 'MT', t: 0, kind: 'biller' }, '', 'send'),
    selftransfer: () => pickPayee({ name: 'My savings', pid: 'Trinity Co-op Credit Union ••9034', init: 'MS', t: 4, kind: 'self' }, '', 'send'),
    payBill: (arg) => {
      const b = BILLS_DUE.find((x) => x.id === arg);
      if (b) pickPayee({ name: b.name, pid: b.pid, init: b.init, t: b.t, kind: 'biller', billId: b.id }, String(b.amt), 'send');
    },
    cat: (arg) => {
      const c = CATEGORIES[+arg];
      pickPayee({ name: c.name, pid: c.pid, init: c.init, t: c.t, kind: 'biller' }, '', 'send');
    },
    quick: (arg) => {
      const cur = parseFloat(S.amount) || 0;
      setState({ amount: String(Math.round((cur + Number(arg)) * 100) / 100) });
    },
    key: (arg) => pressKey(arg),
    pay: submitAmount,
    filter: (arg) => setState({ filter: arg }),
    finish: () => setState({ screen: 'home', payee: null, amount: '', note: '', pin: '', mode: 'send' }),
    again: () => setState({ screen: 'send', payee: null, amount: '', note: '', pin: '', q: '' }),
    copy: () => {
      const done = () => setState({ copied: true });
      try { navigator.clipboard.writeText(ME.pid).then(done, done); } catch (e) { done(); }
    },
    reset: () => { try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ } S = defaults(); render(); }
  };

  app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el || !app.contains(el)) return;
    const fn = ACTIONS[el.dataset.act];
    if (fn) fn(el.dataset.arg);
  });

  // Text inputs update state without re-rendering the whole screen, so typing keeps focus.
  app.addEventListener('input', (e) => {
    if (e.target.id === 'send-q') {
      S.q = e.target.value;
      document.getElementById('send-results').innerHTML = sendResults();
    } else if (e.target.id === 'pay-note') {
      S.note = e.target.value;
    }
  });

  // Desktop keyboard support on the amount and PIN screens.
  document.addEventListener('keydown', (e) => {
    if (S.screen !== 'amount' && S.screen !== 'pin') return;
    if (e.target && e.target.tagName === 'INPUT') return;
    if (/^[0-9]$/.test(e.key) || e.key === '.') pressKey(e.key);
    else if (e.key === 'Backspace') pressKey('b');
    else if (e.key === 'Enter' && S.screen === 'amount') submitAmount();
  });

  render();
})();
