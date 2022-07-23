import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {LoadingService} from '@swimlane/ngx-ui';
import {AppConfigService} from '@service/app-config.service';
import {FileSystemService} from '@service/filesystem/file-system.service';

@Component({
	selector: 'lthn-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
	//public menu: boolean;
	public heading = '';
	@ViewChild('sidenav') public sidenav: MatSidenav;
	public currentFlag: any;
	public currentLanguage$: Subscription;
	public currentLanguage: string = 'en';
	public navExpanded: boolean = true;

	public menuItems = [];

	/**
	 * Starts the Angular framework and configures system plugins
	 *
	 * @param {Router} router
	 * @param {ActivatedRoute} activatedRoute
	 * @param {Title} titleService
	 * @param {Meta} metaService
	 * @param {TranslateService} translate
	 * @param app
	 * @param loadingService
	 * @param fs
	 */
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
		private metaService: Meta,
		private translate: TranslateService,
		private loadingService: LoadingService,
		public app: AppConfigService,
		private fs: FileSystemService
	) {
	}


	public async ngOnInit() {

		this.translate.setDefaultLang('en');
		let lang = this.translate.getBrowserLang();
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		this.translate.use(lang ? lang : 'en');

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.loadingService.start();
			} else if (event instanceof NavigationEnd) {
				this.loadingService.complete();
			}
		});
		await this.getMenuConfig();


	}

	get activeRoute(): number {
		return this.menuItems.findIndex(x => {
			if (x['url']) {
				return x.url.join('/').endsWith(this.router.url);
			} else if (x['app']) {
				return this.router.url.endsWith(x.app);
			} else {
				return 0
			}
		});
	}

	public async ngAfterContentInit() {

		try {
			await this.app.fetchServerPublicKey();

			await this.app.loadConfig('conf/app.ini');

		} catch (e) {
			if ('HttpErrorResponse' === e.name) {
				if (e.status === 401) {

				} else if (e.status === 404) {

					await this.app.makeDefault();
					await this.app.loadConfig('conf/app.ini');

				}
			}
		}

		if (!await this.fs.isFile('data/objects/apps/menu.json')) {

			try {
				this.menuItems = [
					{'title': 'menu.text.dashboard', 'icon': ['fas', 'gauge'], 'url': ['/', 'dashboard']},
					{'title': 'menu.text.chain', 'icon': ['fas', 'link'], 'url': ['/', 'chain']},
					{'title': 'menu.text.wallet', 'icon': ['fas', 'wallet'], 'url': ['/', 'wallet']},
					{'title': 'menu.text.mining', 'icon': ['fas', 'person-digging'], 'url': ['/', 'mining', 'xmrig']}
				];

				const containers = await fetch('http://localhost:36911/system/data/object/set', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({group: 'apps', object: 'menu', data: this.menuItems})
				});
				await containers.json();
			} catch (e) {
				//return false;
			}

		}


		this.updateMeta();
	}

	/**
	 * Dispatch a language change request
	 *
	 * @param {string} lang
	 */
	changeLanguage(lang: string) {
		console.log(lang);
		this.currentLanguage = lang;
		this.translate.use(lang);
	}


	/**
	 * creates subscriptions for multi lingual page meta
	 */
	updateMeta() {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				const rt = this.getChild(this.activatedRoute);
				rt.data.subscribe((data) => {
					this.translate.get(data.title).subscribe((res: string) => {
						this.titleService.setTitle(res);
					});

					this.heading = data.heading;
					if (data.description) {

						this.translate.get(data.description).subscribe(() => {
							this.metaService.updateTag({
								name: 'description',
								content: data.description
							});
						});

					} else {
						this.metaService.removeTag('name=\'description\'');
					}

					if (!data.robots) {
						this.metaService.updateTag({
							name: 'robots',
							content: 'nofollow,noindex'
						});
					} else {
						this.metaService.updateTag({
							name: 'robots',
							content: 'follow,index'
						});
					}
				});
			});
	}


	/**
	 * Angular router helper
	 *
	 * @param {ActivatedRoute} activatedRoute
	 * @returns {any}
	 */
	getChild(activatedRoute: ActivatedRoute) {
		if (activatedRoute.firstChild) {
			return this.getChild(activatedRoute.firstChild);
		} else {
			return activatedRoute;
		}
	}

	public getChildItems() {
		console.log(this.activatedRoute.url);
	}

	async getMenuConfig() {
		try {
			const containers = await fetch('http://localhost:36911/system/data/object/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({group: 'apps', object: 'menu'})
			});
			return this.menuItems = await containers.json();
		} catch (e) {
			return false;
		}

	}
}
