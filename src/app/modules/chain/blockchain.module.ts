import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockchainComponent} from 'src/app/modules/chain/blockchain.component';
import {ChartModule} from '@module/chart/chart.module';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ReactiveComponentModule} from '@ngrx/component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {PipesModule} from '@pipe/pipes.module';
import {HashRatePipe} from '@pipe/crypto/hashrate.pipe';
import {MomentModule} from 'ngx-moment';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
	declarations: [BlockchainComponent],
	imports: [
		CommonModule,
		ChartModule,
		MatCardModule,
		MatListModule,
		MatButtonModule,
		FlexModule,
		TranslateModule,
		NgxDatatableModule,
		ReactiveComponentModule,
		PipesModule,
		MatIconModule,
		MatToolbarModule,
		MatTooltipModule,
		MatMenuModule,
		MomentModule,
		MatProgressBarModule
	],
	exports: [ BlockchainComponent],
	providers: [HashRatePipe]
})
export class BlockchainModule {
}
