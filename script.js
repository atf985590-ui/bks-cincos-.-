document.addEventListener('DOMContentLoaded', () => {

    // --- العناصر الأساسية ---
    const loginPage = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');
    const loginForm = document.getElementById('login-form');
    const welcomePopup = document.getElementById('welcome-popup');
    const closePopupButton = document.getElementById('close-popup');
    const mainContent = document.getElementById('main-content');
    const navButtons = document.querySelectorAll('.nav-btn');
    const headerButtons = document.querySelectorAll('.header-btn');

    let userEmail = '';
    let userId = '';
    let referralCode = '';

    // --- بيانات المنصة (بديل لقاعدة البيانات) ---
    const vipPlansData = [
        { id: 1, price: 5.00, daily: 1.10, invite: 1.00, tasks: 1.05 },
        { id: 2, price: 5.74, daily: 1.26, invite: 1.15, tasks: 1.21 },
        { id: 3, price: 6.59, daily: 1.45, invite: 1.32, tasks: 1.38 },
        { id: 4, price: 7.57, daily: 1.67, invite: 1.51, tasks: 1.59 },
        { id: 5, price: 8.71, daily: 1.92, invite: 1.74, tasks: 1.83 },
        { id: 6, price: 10.01, daily: 2.20, invite: 2.00, tasks: 2.10 },
        { id: 7, price: 11.51, daily: 2.53, invite: 2.30, tasks: 2.42 },
        { id: 8, price: 13.23, daily: 2.91, invite: 2.65, tasks: 2.78 },
        { id: 9, price: 15.20, daily: 3.34, invite: 3.04, tasks: 3.19 },
        { id: 10, price: 17.47, daily: 3.84, invite: 3.49, tasks: 3.67 },
        { id: 11, price: 20.07, daily: 4.42, invite: 4.01, tasks: 4.21 },
        { id: 12, price: 23.06, daily: 5.07, invite: 4.61, tasks: 4.84 },
        { id: 13, price: 26.52, daily: 5.83, invite: 5.30, tasks: 5.57 },
        { id: 14, price: 30.49, daily: 6.71, invite: 6.10, tasks: 6.40 },
        { id: 15, price: 35.11, daily: 7.72, invite: 7.02, tasks: 7.37 },
        { id: 16, price: 40.49, daily: 8.91, invite: 8.10, tasks: 8.50 },
        { id: 17, price: 46.71, daily: 10.28, invite: 9.34, tasks: 9.81 },
        { id: 18, price: 53.91, daily: 11.86, invite: 10.78, tasks: 11.32 },
        { id: 19, price: 62.23, daily: 13.69, invite: 12.45, tasks: 13.07 },
        { id: 20, price: 71.84, daily: 15.80, invite: 14.37, tasks: 15.09 },
    ];

    const depositMethods = [
        { name: 'USDT (TRC20)', address: 'TLsGeELYfexmuhK6g3TVQ44AAt5kxZN3gb', logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=026' },
        { name: 'Bitcoin (Segwit)', address: 'bc1qlvx4tzwzvm66p0ukfykkv4zsqq7ywug65282u2', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=026' },
        { name: 'BNB (BEP20)', address: '0x83c317eab7f9d70cf1f98ca8cd30fce09d7fe18e', logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=026' },
        { name: 'Ethereum (ERC20)', address: '0x83c317eab7f9d70cf1f98ca8cd30fce09d7fe18e', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026' },
    ];

    const withdrawMethods = [
        { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
        { name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
        { name: 'MasterCard', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg' },
        { name: 'Bitcoin (BTC)', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=026' },
        { name: 'Ethereum (ETH)', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026' },
        { name: 'فودافون كاش', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Vodafone_2017_logo.svg/1024px-Vodafone_2017_logo.svg.png' },
        // ... والمزيد
    ];


    // --- وظائف توليد المحتوى ---
    const createHomePage = () => `
        <div id="home-section" class="section active">
            <div class="scrolling-banner-container">
                <div class="scrolling-banner"></div>
            </div>
            <div class="plans-slider">
                <h2 class="section-title">الخطط الأكثر ربحاً</h2>
                <!-- يمكن إضافة سلايدر هنا لاحقاً -->
            </div>
             <h2 class="section-title">ألعاب تفاعلية</h2>
             <div class="task-grid">
                <div class="task">لعبة الذاكرة</div>
                <div class="task">لعبة الأرقام</div>
             </div>
        </div>`;

    const createVipPage = () => {
        const plansHTML = vipPlansData.map(plan => `
            <div class="vip-card">
                <h3><i class="fas fa-crown"></i> VIP ${plan.id}</h3>
                <div class="price">$${plan.price.toFixed(2)}</div>
                <div class="details">
                    <p>الربح اليومي (22%): <strong>$${plan.daily.toFixed(2)}</strong></p>
                    <p>ربح دعوة صديق (20%): <strong>$${plan.invite.toFixed(2)}</strong></p>
                    <p>مكافأة 5 مهام (21%): <strong>$${plan.tasks.toFixed(2)}</strong></p>
                </div>
                <button class="action-button">اشترك الآن</button>
            </div>`).join('');
        return `<div id="vip-section" class="section"><h2 class="section-title">خطط كبار الشخصيات</h2><div class="vip-grid">${plansHTML}</div></div>`;
    };

    const createTasksPage = () => `
        <div id="tasks-section" class="section">
            <h2 class="section-title">مركز المهام</h2>
            <div class="task-grid">
                <div class="task locked" onclick="alert('يجب الاشتراك في خطة VIP أولاً')">مشاهدة الإعلانات</div>
                <div class="task locked" onclick="alert('يجب الاشتراك في خطة VIP أولاً')">التسجيل اليومي</div>
                <div class="task">لعبة تفاعلية للتسلية 1</div>
                <div class="task">لعبة تفاعلية للتسلية 2</div>
            </div>
        </div>`;

    const createInvitePage = () => `
        <div id="invite-section" class="section">
             <h2 class="section-title">دعوة الأصدقاء</h2>
             <div class="profile-card">
                 <p>شارك كود الإحالة الخاص بك وابدأ في الكسب!</p>
                 <p><strong>كود الإحالة:</strong> <span id="referral-code">${referralCode}</span></p>
                 <button class="action-button" id="copy-referral-btn">نسخ الكود</button>
             </div>
        </div>`;

    const createMePage = () => `
        <div id="me-section" class="section">
            <h2 class="section-title">ملفي الشخصي</h2>
            <div class="profile-card">
                <p><strong>ID المستخدم:</strong> <span id="user-id">${userId}</span></p>
                <p><strong>البريد الإلكتروني:</strong> <span id="user-email">${userEmail}</span></p>
                <button class="action-button" style="margin-top: 20px;">سجلات السحب</button>
            </div>
            <div class="profile-card" style="margin-top:20px; text-align:right;">
                <h3 style="margin-bottom:15px; color: var(--primary-color);">تواصل معنا</h3>
                <p><strong>للاستفسارات:</strong> contact@bkscincos.com</p>
                <p><strong>قناة التليجرام:</strong> <a href="https://t.me/ta_ta_ta_123" target="_blank" style="color:white;">انضم الآن</a></p>
                <button class="action-button" id="agents-btn" style="margin-top:15px;">كن وكيلاً</button>
            </div>
        </div>`;
    
    const createDepositPage = () => {
        const methodsHTML = depositMethods.map(method => `
            <div class="item">
                <img src="${method.logo}" alt="${method.name}" class="logo">
                <div class="info">
                    <strong>${method.name}</strong>
                    <p class="address">${method.address}</p>
                </div>
                <button class="copy-btn" data-address="${method.address}">نسخ</button>
            </div>`).join('');
        return `<div id="deposit-section" class="section"><h2 class="section-title">إيداع الأموال</h2><div class="payment-list">${methodsHTML}</div></div>`;
    };

    const createWithdrawPage = () => {
        const methodsHTML = withdrawMethods.map(method => `
            <div class="item">
                <img src="${method.logo}" alt="${method.name}" class="logo">
                <div class="info"><strong>${method.name}</strong></div>
            </div>`).join('');
        return `<div id="withdraw-section" class="section"><h2 class="section-title">سحب الأرباح</h2><div class="payment-list">${methodsHTML}</div></div>`;
    };

    // --- وظائف التنقل والتفاعل ---
    function navigateTo(targetId) {
        // إزالة active من كل الأزرار
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // إضافة active للزر المستهدف
        const targetButton = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        if(targetButton) targetButton.classList.add('active');

        let newContent = '';
        switch (targetId) {
            case 'home-section': newContent = createHomePage(); break;
            case 'vip-section': newContent = createVipPage(); break;
            case 'tasks-section': newContent = createTasksPage(); break;
            case 'invite-section': newContent = createInvitePage(); break;
            case 'me-section': newContent = createMePage(); break;
            case 'deposit-section': newContent = createDepositPage(); break;
            case 'withdraw-section': newContent = createWithdrawPage(); break;
        }
        mainContent.innerHTML = newContent;

        if (targetId === 'home-section') {
            startWithdrawalBanner();
        }
    }

    // --- معالجات الأحداث ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        userEmail = document.getElementById('email').value;
        userId = `BKS${Math.floor(100000 + Math.random() * 900000)}`;
        referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        loginPage.classList.remove('active');
        mainApp.classList.add('active');
        welcomePopup.style.display = 'flex';
        navigateTo('home-section');
    });

    closePopupButton.addEventListener('click', () => {
        welcomePopup.style.display = 'none';
    });
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => navigateTo(button.dataset.target));
    });

    headerButtons.forEach(button => {
        button.addEventListener('click', () => navigateTo(button.dataset.target));
    });

    // تفويض الأحداث للمحتوى الديناميكي
    mainContent.addEventListener('click', (e) => {
        // زر النسخ
        if (e.target.classList.contains('copy-btn')) {
            const address = e.target.dataset.address;
            navigator.clipboard.writeText(address).then(() => {
                e.target.textContent = 'تم النسخ!';
                setTimeout(() => { e.target.textContent = 'نسخ'; }, 2000);
            });
        }
        // زر نسخ كود الإحالة
        if (e.target.id === 'copy-referral-btn') {
            navigator.clipboard.writeText(referralCode).then(() => {
                e.target.textContent = 'تم نسخ الكود!';
                setTimeout(() => { e.target.textContent = 'نسخ الكود'; }, 2000);
            });
        }
        // زر الوكلاء
        if (e.target.id === 'agents-btn') {
            alert('لكي تصبح وكيلاً، يجب أن يكون لديك جروب تليجرام وفريق لا يقل عن 15 عضواً مشتركين في الخطة الأولى. ستحصل على راتب يومي ثابت يبدأ من 100 دولار.');
        }
    });

    // --- وظائف إضافية ---
    function startWithdrawalBanner() {
        const banner = document.querySelector('.scrolling-banner');
        if (!banner) return;
        
        function updateBanner() {
            const amount = (Math.random() * 90 + 10).toFixed(2);
            banner.innerHTML = `
                <span><i class="fas fa-check-circle"></i> تم سحب ${amount}$ بنجاح</span>
                <span><i class="fas fa-check-circle"></i> تم سحب ${(Math.random() * 90 + 10).toFixed(2)}$ بنجاح</span>
                <span><i class="fas fa-check-circle"></i> تم سحب ${(Math.random() * 90 + 10).toFixed(2)}$ بنجاح</span>
            `;
        }
        updateBanner();
        setInterval(updateBanner, 5000);
    }
});```
