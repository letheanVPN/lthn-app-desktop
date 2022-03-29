import {Component} from '@angular/core';
import {ChainGetInfo} from '@module/chain/interfaces/props/get_info';
import {BlockchainService} from '@module/chain/blockchain.service';
import {FileSystemService} from '@service/filesystem/file-system.service';
import {NotificationService, NotificationStyleType, NotificationType} from '@swimlane/ngx-ui';
@Component({
	selector: 'lthn-chain-config',
	templateUrl: './config.component.html'
})
export class BlockchainConfigComponent {

	public config = ''
	chainInfo: ChainGetInfo;

	constructor(public chain: BlockchainService, private fs: FileSystemService, private notify: NotificationService) {
		this.load().then(() => console.log('loaded'));
	}

	async save() {
		await this.fs.writeFile('conf/letheand.conf', this.config)
		this.notify.create({
			type: NotificationType.html,
			styleType: NotificationStyleType.success,
			title: 'Saved Config File'
		})
	}

	async load() {
		this.config = await this.fs.readFile('conf/letheand.conf')
	}

}
