import * as CookieConsent from 'vanilla-cookieconsent';

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
						title: 'We use cookies',
						description:
							'This website uses cookies to enhance your browsing experience and analyze site traffic. You can choose to accept or reject non-essential cookies.',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject all',
						showPreferencesBtn: 'Manage preferences',
						closeIconLabel: 'Close',
						footer: '<a href="#privacy-policy">Privacy Policy</a>'
					},
					preferencesModal: {
						title: 'Cookie preferences',
						acceptAllBtn: 'Accept all',
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
		theme: {
			light: {
				primary: '#000000',
				secondary: '#f1d600',
				text: '#ffffff',
				textSecondary: '#cccccc',
				bg: '#000000',
				bgSecondary: '#1a1a1a',
				border: '#333333',
				overlay: {
					bg: 'rgba(0, 0, 0, 0.8)',
					blur: '5px'
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
