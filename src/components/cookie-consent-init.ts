import * as CookieConsent from 'vanilla-cookieconsent';
import SBRFavicon from '@/assets/SBR2026-Favicon.png';

type ConsentCookie = { categories: string[] };

function updateAnalyticsConsent(cookie: ConsentCookie) {
	const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
	if (!gtag) return;
	const analyticsAccepted = cookie.categories.includes('analytics');
	gtag('consent', 'update', {
		analytics_storage: analyticsAccepted ? 'granted' : 'denied'
	});
}

export function runCookieConsent() {
	if (typeof window === 'undefined') return;
	if (!CookieConsent || !(CookieConsent as any).run) return;

	(CookieConsent as any).run({
		revision: 0,
		guiOptions: {
			consentModal: {
				layout: 'box',
				position: 'bottom right',
				equalWeightButtons: true,
				flipButtons: false
			},
			preferencesModal: {
				layout: 'box',
				position: 'right',
				equalWeightButtons: true,
				flipButtons: false
			}
		},
		categories: {
			necessary: {
				enabled: true,
				readOnly: true
			},
			analytics: {
				enabled: true,
				autoClear: {
					cookies: [
						{ name: /^_ga/ }, // Google Analytics
						{ name: /^_gid/ }, // Google Analytics
						{ name: /^_gat/ } // Google Analytics
					]
				},
				services: {
					ga: {
						label: 'Google Analytics',
						description: 'We use Google Analytics to analyze website usage and improve user experience.',
						onAccept: () => {
							// Google Analytics is already loaded in main.astro
						},
						onReject: () => {
							const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
							if (!gtag) return;
							gtag('consent', 'update', { analytics_storage: 'denied' });
						}
					}
				}
			}
		},
		language: {
			default: 'en',
			translations: {
				en: {
					consentModal: {
						title: `<img src="${SBRFavicon.src}" alt="SynBioReactor Logo" class="w-7 h-7 inline-block mr-1" />Help Us Improve!`,
						description:
							'We use cookies to enhance your browsing experience by analyzing site traffic and learning about our audience. You can change your mind and reject non-essential cookies at any time.',
						acceptAllBtn: 'Accept Default',
						// acceptNecessaryBtn: 'Reject all',
						showPreferencesBtn: 'Manage settings',
						closeIconLabel: 'Close',
						footer: `<a href="#privacy-policy">Privacy Policy</a>`
					},
					preferencesModal: {
						title: 'Cookie preferences',
						acceptAllBtn: 'Accept Default',
						acceptNecessaryBtn: 'Reject all',
						savePreferencesBtn: 'Save preferences',
						closeIconLabel: 'Close',
						sections: [
							{
								title: 'Cookie Usage',
								description:
									'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.'
							},
							{
								title: 'Strictly Necessary cookies',
								description:
									'These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly.',
								linkedCategory: 'necessary'
							},
							{
								title: 'Analytics cookies',
								description:
									'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
								linkedCategory: 'analytics'
							},
							{
								title: 'More information',
								description:
									'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="#contact">contact us</a>.'
							}
						]
					}
				}
			}
		},
		onFirstConsent: ({ cookie }: { cookie: ConsentCookie }) => updateAnalyticsConsent(cookie),
		onConsent: ({ cookie }: { cookie: ConsentCookie }) => updateAnalyticsConsent(cookie)
	});
}

export function openCookiePreferences() {
	if (typeof window === 'undefined') return;
	const showPreferences = (CookieConsent as any)?.showPreferences as undefined | (() => void);
	if (showPreferences) showPreferences();
}
