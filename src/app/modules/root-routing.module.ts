import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RootComponent} from '@module/root.component';
import {RootModule} from '@module/root.module';
import {TerminalComponent} from '@module/console/terminal.component';

const routes: Routes = [
	{
		path: 'dashboard',
		component: RootComponent,
		pathMatch: 'full',
		data: {
			title: 'view.dashboard.title',
			heading: 'view.dashboard.heading',
			description: 'view.dashboard.description',
			robots: true
		}
	},
	{
		path: 'terminal',
		component: TerminalComponent,
		pathMatch: 'full',
		data: {
			title: 'view.terminal.title',
			heading: 'view.terminal.heading',
			description: 'view.terminal.description',
			robots: true
		}
	},

];

@NgModule({
	declarations: [],
	imports: [CommonModule,
		RootModule,
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RootRoutingModule {
}