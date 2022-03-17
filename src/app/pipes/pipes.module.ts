import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffortPipe, EscapeHtmlPipe, HashLinkPipe, HashRatePipe, RemoveTrailingZerosPipe, ShruggiePipe, TimeAgoPipe, ToCoinPipe} from '@pipe/index';
import {FromCoinPipe} from '@pipe/crypto/fromCoin.pipe';

@NgModule({
	declarations: [
		HashRatePipe,
		EffortPipe,
		TimeAgoPipe,
		EscapeHtmlPipe,
		ShruggiePipe,
		RemoveTrailingZerosPipe,
		ToCoinPipe,
		FromCoinPipe,
		HashLinkPipe
	],
	exports: [
		HashRatePipe,
		EffortPipe,
		TimeAgoPipe,
		EscapeHtmlPipe,
		ShruggiePipe,
		RemoveTrailingZerosPipe,
		ToCoinPipe,
		HashLinkPipe,
		FromCoinPipe
	],
	imports: [CommonModule]
})
export class PipesModule {
}
