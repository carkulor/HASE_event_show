// Hang Seng Bank Annual Milestones Interactive Website
// Main JavaScript file for handling timeline navigation and card display

class HangSengTimeline {
    constructor() {
        this.currentYear = 2024; // Default or dynamically set to latest
        this.data = [];
        this.init();
    }
    
    async init() {
        this.showLoadingIndicator();
        try {
            await this.loadData();
            this.renderTimeline();
            this.renderCards();
            this.setupEventListeners();
            this.setupIntersectionObserver();
            // Set initial active year based on data or default
            if (this.data.length > 0) {
                 // Default to the latest year in the data or a specific year
                const latestYearData = this.data.reduce((latest, current) => (current.year > latest.year ? current : latest), this.data[0]);
                this.currentYear = latestYearData.year;
                this.updateActiveYear(this.currentYear, true); // true to scroll to it
            }

        } catch (error) {
            console.error('Failed to initialize timeline:', error);
            this.showError();
        } finally {
            this.hideLoadingIndicator();
        }
    }
    
    async loadData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                console.warn('Failed to load data.json, attempting fallback.');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
            if (!this.data || this.data.length === 0) {
                console.warn('data.json is empty or invalid, attempting fallback.');
                throw new Error('Empty or invalid data from data.json');
            }
        } catch (error) {
            console.error('Error loading data.json:', error.message, '. Using fallback data.');
            this.data = this.getFallbackData();
        }
    }
    
    getFallbackData() {
        // Fallback data with corrected punctuation
        return [
            {
                "year": 2015,
                "milestones": [
                    "大幅出售兴业银行股权：年内分两次配售持有多年的兴业银行股权，共套现逾300亿港元，调整资产结构。",
                    "荣获多项可持续发展及企业社会责任奖项：进一步巩固在环境、社会及管治（ESG）领域的领先地位。",
                    "持续推动大湾区金融服务与内地市场布局：加大对中国内地市场的战略关注和业务拓展。",
                    "发布《恒生可持续发展企业指数》：支持ESG投资和推动气候目标相关金融工具的发展。",
                    "积极响应金融科技创新及监管合规：配合香港金管局等监管机构，探索并应用新兴金融科技。"
                ]
            },
            {
                "year": 2016,
                "milestones": [
                    "拓展海外分行网络：在澳门、新加坡设立分行，进一步扩张区域业务版图。",
                    "加强中小企融资与创新生态支持：深化与各产业协会合作，助力中小企业发展。",
                    "提升流动银行与数码服务能力：推出多项新的手机理财功能，优化客户数字化体验。",
                    "推动绿色金融产品发展：率先开发绿色贷款、可持续发展相关金融工具，成为市场先行者。",
                    "荣获多项区域内最佳金融服务品牌奖项：持续增强品牌影响力，巩固行业地位。"
                ]
            },
            {
                "year": 2017,
                "milestones": [
                    "存款总额创历史新高：反映客户基础的稳步扩大及业务的健康增长。",
                    "保险业务表现突出并推数码化服务：通过创新数码渠道，提升保险业务的服务效率和客户体验。",
                    "恒生指数组合产品持续丰富：为投资者提供更多元化的市场基准与指数工具选择。",
                    "深化“智能理财”应用：进一步利用科技优化客户投资流程和体验。",
                    "获得国际信贷评级机构上调评级：体现银行稳健的财务状况和风险管理能力获得认可。"
                ]
            },
            {
                "year": 2018,
                "milestones": [
                    "实现营业溢利与除税前溢利规模新突破：盈利能力迈上新台阶，财务表现强劲。",
                    "大力投资金融科技：推出API开放银行平台和数据创新服务，拥抱科技转型。",
                    "积极参与大湾区“理财通”跨境业务试点：先行服务大湾区客户，探索跨境金融新模式。",
                    "ESG主题基金和绿色债券发行显著增加：在可持续金融领域的产品创新和市场参与度提升。",
                    "启动员工数字能力提升计划：着力提升内部团队的数字化技能和创新能力。"
                ]
            },
            {
                "year": 2019,
                "milestones": [
                    "股东应得溢利突破240亿港元：盈利能力保持增长态势，为股东带来良好回报。",
                    "上线香港手机入票服务：通过电子渠道创新提升客户进行票据处理的便捷性。",
                    "恒生银行（中国）继续扩张：深化在内地市场的布局，尤其在大湾区成为重要参与者。",
                    "投资管理规模创新高：恒生投资管理有限公司的业务地位和资产管理规模进一步提升。",
                    "获《亚洲银行家》评为年度香港最佳流动理财服务银行：在移动银行服务领域的创新和体验获得行业认可。"
                ]
            },
            {
                "year": 2020,
                "milestones": [
                    "新冠疫情下保障运营连续性：通过远程和数码渠道确保客户服务不受影响，展现业务韧性。",
                    "加大社区支援及防疫援助：积极履行企业社会责任，支持香港及内地社区应对疫情挑战。",
                    "数码客户数和线上交易大幅提升：数字化战略在疫情推动下加速落地，线上业务量激增。",
                    "绿色贷款及ESG投融资业务快速增长：顺应市场趋势，加大可持续金融领域的业务拓展。",
                    "推动银企合作创新，提升中小企业数字理财体验：利用科技手段，增强与中小企业的合作黏性。"
                ]
            },
            {
                "year": 2021,
                "milestones": [
                    "启动2021-2024年策略计划：明确未来几年发展方向，聚焦财富管理、大湾区和数字化。",
                    "恒生投资管理接管盈富基金：成为香港资产管理规模最大的交易所买卖基金（ETF）经理，显著提升市场地位。",
                    "成为首批参与“跨境理财通”业务的银行：在大湾区跨境金融互联互通中抢占先机。",
                    "成为香港首家提供“绿色按揭服务”的银行：推出创新绿色金融产品，支持可持续发展。",
                    "持续优化分行网络与数字服务：在区块链、人工智能等前沿技术领域进行投入和探索。"
                ]
            },
            {
                "year": 2022,
                "milestones": [
                    "庆祝成立89周年：继续保持香港最大本地银行的领先地位。",
                    "财务表现稳健，净利息收入同比增长22%：面对市场挑战，核心业务盈利能力突出，资产及资本充足率创新高。",
                    "深化大湾区战略布局：在香港上水开设跨境财富管理中心，强化跨境服务能力。",
                    "可持续金融业务高速发展：绿色贷款、ESG ETF等产品及额度创新高，个人绿色信贷产品加速增长。",
                    "数码化创新成果显著：全年推出逾460项新数码服务，积极探索NFT、元宇宙等前沿应用。"
                ]
            },
            {
                "year": 2023,
                "milestones": [
                    "隆重庆祝成立90周年：举办系列纪念活动，回顾历史成就并展望未来发展。",
                    "数字理财用户和移动理财活跃客户显著增长：数字化服务普及率和用户黏性大幅提升。",
                    "财务业绩保持稳健，资本充足率及信用评级保持高位：体现了良好的风险管理和资本实力。",
                    "持续引领ESG金融产品创新：恒生投资管理在ETF及ESG金融产品领域保持市场领先地位。",
                    "在《恒生可持续企业指数》中升至AA+评级并获多项ESG奖项：可持续发展表现得到进一步认可。"
                ]
            },
            {
                "year": 2024,
                "milestones": [
                    "全年财务业绩稳健增长：归属于股东的溢利达183.79亿港元，除税前溢利逾210亿港元。",
                    "跨境财富管理业务强劲增长：富裕客户数目、新增富裕客户及内地客户新开户数均实现显著增长。",
                    "拓展全球市场ETF产品：推出覆盖美日指数的ETF，并与SAB Invest合作在沙特上市恒生香港ETF。",
                    "推出总额达1130亿港元融资基金：包括330亿港元中小企Power Up融资基金和800亿港元可持续发展Power Up融资基金，支持本地经济和绿色转型。",
                    "董事长利蕴莲宣布退任：服务多年的董事长宣布将于2025年股东会后卸任，标志着高层领导的平稳过渡。"
                ]
            }
        ];
    }
    
    renderTimeline() {
        const timelineContainer = document.querySelector('.timeline-nav .flex .min-w-max'); // Target innermost flex container
        if (!timelineContainer) {
            console.error("Timeline container not found for rendering timeline.");
            return;
        }
        timelineContainer.innerHTML = ''; // Clear previous items
        
        // Create timeline line if not already part of static HTML (it is, via JS in original)
        // Check if timeline-line element already exists as a sibling or child, if needed.
        // Current approach: line is separate element.
        if (!timelineContainer.querySelector('.timeline-line')) {
            const timelineLine = document.createElement('div');
            timelineLine.className = 'timeline-line';
            timelineContainer.appendChild(timelineLine); // Append line to the same container as items
        }
        
        this.data.sort((a, b) => a.year - b.year).forEach((yearData) => { // Ensure data is sorted by year
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item`; // Active class handled by updateActiveYear
            timelineItem.setAttribute('data-year', yearData.year);
            timelineItem.setAttribute('tabindex', '0');
            timelineItem.setAttribute('role', 'button');
            timelineItem.setAttribute('aria-label', `跳转到${yearData.year}年`);
            
            timelineItem.innerHTML = `
                <div class="timeline-year">${yearData.year}</div>
                <div class="timeline-dot"></div>
            `;
            
            timelineContainer.appendChild(timelineItem);
        });
    }
    
    renderCards() {
        const cardsContainer = document.getElementById('cards-container');
        if (!cardsContainer) {
            console.error("Cards container not found.");
            return;
        }
        cardsContainer.innerHTML = '';
        
        this.data.sort((a, b) => a.year - b.year).forEach((yearData, index) => { // Ensure data is sorted
            const card = document.createElement('div');
            card.className = 'year-card p-6 sm:p-8 fade-in-up';
            card.setAttribute('data-year', yearData.year);
            card.setAttribute('id', `year-${yearData.year}`);
            card.setAttribute('role', 'region');
            card.setAttribute('aria-labelledby', `year-title-${yearData.year}`);
            card.style.animationDelay = `${index * 0.1}s`;
            
            const milestonesHTML = yearData.milestones.map(milestone => `
                <li class="milestone-item">
                    <div class="milestone-bullet"></div>
                    <div class="milestone-text">${milestone}</div>
                </li>
            `).join('');
            
            card.innerHTML = `
                <h2 class="year-title" id="year-title-${yearData.year}">${yearData.year}</h2>
                <ul class="milestone-list" aria-label="${yearData.year}年的大事记">
                    ${milestonesHTML}
                </ul>
            `;
            
            cardsContainer.appendChild(card);
        });
    }
    
    setupEventListeners() {
        const timelineNavContainer = document.querySelector('.timeline-nav');
        if (timelineNavContainer) {
            timelineNavContainer.addEventListener('click', (e) => {
                const item = e.target.closest('.timeline-item');
                if (item) {
                    const year = parseInt(item.dataset.year);
                    this.navigateToYear(year);
                }
            });
            
            timelineNavContainer.addEventListener('keydown', (e) => {
                const item = e.target.closest('.timeline-item');
                if (item && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    const year = parseInt(item.dataset.year);
                    this.navigateToYear(year);
                }
            });
        }
        // Smooth scroll for anchor links (already in place, seems general purpose, keep it)
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetSelector = e.target.getAttribute('href');
                try {
                    const target = document.querySelector(targetSelector);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } catch (error) {
                    console.warn(`Invalid selector for anchor link: ${targetSelector}`);
                }
            }
        });
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Activates when card is in middle 50% of viewport
            threshold: 0.1 // At least 10% of the card is visible
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const year = parseInt(entry.target.dataset.year);
                    this.updateActiveYear(year, false); // false: don't scroll, just update state
                }
            });
        }, options);
        
        document.querySelectorAll('.year-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    navigateToYear(year) {
        const targetCard = document.getElementById(`year-${year}`);
        if (targetCard) {
            const header = document.querySelector('header');
            const nav = document.querySelector('nav.timeline-nav-sticky'); // Use a more specific selector if nav is just 'nav'
            
            let offset = 20; // Default offset
            if (header) offset += header.offsetHeight;
            if (nav) offset += nav.offsetHeight;
            
            const targetPosition = targetCard.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            this.updateActiveYear(year, false); // Update active state, no need to scroll again
        }
    }
    
    updateActiveYear(year, shouldScrollTimelineNav) {
        if (this.currentYear !== year || shouldScrollTimelineNav) { // also update if forced by scroll
            this.currentYear = year;
            let activeTimelineItem = null;
            
            document.querySelectorAll('.timeline-item').forEach(item => {
                const itemYear = parseInt(item.dataset.year);
                if (itemYear === year) {
                    item.classList.add('active');
                    item.setAttribute('aria-current', 'true');
                    activeTimelineItem = item;
                } else {
                    item.classList.remove('active');
                    item.removeAttribute('aria-current');
                }
            });
            
            document.title = `恒生银行年度大事记 - ${year}年`;

            if (shouldScrollTimelineNav && activeTimelineItem) {
                const nav = document.querySelector('.timeline-nav'); // The scrollable container
                if (nav) {
                    const navRect = nav.getBoundingClientRect();
                    const itemRect = activeTimelineItem.getBoundingClientRect();
                    
                    // Scroll timeline nav to center the active item
                    const scrollOffset = (itemRect.left - navRect.left) - (navRect.width / 2) + (itemRect.width / 2);
                    nav.scrollBy({ left: scrollOffset, behavior: 'smooth' });
                }
            }
        }
    }
    
    showError() {
        const cardsContainer = document.getElementById('cards-container');
        if (!cardsContainer) return;
        cardsContainer.innerHTML = `
            <div class="text-center py-12 px-4">
                <div class="text-red-600 text-lg font-semibold mb-4" role="alert">
                    数据加载失败
                </div>
                <div class="text-gray-600 mb-6">
                    请检查网络连接或稍后重试。如果问题持续，请联系网站管理员。
                </div>
                <button onclick="location.reload()" class="bg-hsg-green text-white px-6 py-3 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-hsg-green focus:ring-opacity-50 transition-colors text-base">
                    重新加载
                </button>
            </div>
        `;
    }

    showLoadingIndicator() {
        if (document.getElementById('loading-indicator')) {
            const indicator = document.getElementById('loading-indicator');
            const innerDiv = indicator.querySelector('div:first-child');
            if (innerDiv) innerDiv.style.opacity = '1';
            else indicator.style.opacity = '1';
            return;
        }

        const loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'loading-indicator';
        loadingIndicator.setAttribute('aria-live', 'assertive');
        loadingIndicator.setAttribute('aria-label', '正在加载内容');
        loadingIndicator.innerHTML = `
            <div class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                <div class="text-center">
                    <div class="w-16 h-16 border-4 border-hsg-green border-t-transparent rounded-full animate-spin mx-auto mb-4" role="status" aria-label="加载动画"></div>
                    <div class="text-hsg-green font-semibold">加载中...</div>
                </div>
            </div>
        `;
        document.body.appendChild(loadingIndicator);
    }

    hideLoadingIndicator() {
        const indicator = document.getElementById('loading-indicator');
        if (indicator) {
            const innerDiv = indicator.querySelector('div:first-child');
            if (innerDiv) {
                innerDiv.style.opacity = '0';
            } else {
                indicator.style.opacity = '0'; // Fallback
            }
            setTimeout(() => indicator.remove(), 300);
        }
    }
}

// Initialize the timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add a more specific class to the sticky nav for JS targeting if needed
    const navElement = document.querySelector('nav.bg-white.border-b');
    if (navElement) {
        navElement.classList.add('timeline-nav-sticky');
    }
    new HangSengTimeline();
});
