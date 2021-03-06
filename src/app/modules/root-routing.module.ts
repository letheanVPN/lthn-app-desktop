import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RootComponent} from '@module/root.component';
import {RootModule} from '@module/root.module';
import {AuthGuard} from '@module/auth/route.guard';

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
	}

];

@NgModule({
	declarations: [],
	imports: [CommonModule,
		RootModule,
		RouterModule.forChild(routes)],
	providers: [AuthGuard],
	exports: [RouterModule]
})
export class RootRoutingModule {
}
