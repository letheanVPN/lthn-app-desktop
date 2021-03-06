import { Component, OnInit } from '@angular/core';
import {TransferIn, TransferOut} from '@module/wallet/interfaces';
import {WalletService} from '@module/wallet/wallet.service';
import {AlertService, AlertStyles} from '@swimlane/ngx-ui';

@Component({
  selector: 'lthn-wallet-transfer',
  templateUrl: './transfer.component.html',
})
export class TransferComponent implements OnInit {

  transfer: TransferIn = {
    destinations: [
      {
        address: '',
        amount: 0
      }
    ],
    mixin: 5,
    unlock_time:0,
    get_tx_key: true,
    payment_id: undefined
  }

  constructor(public wallet: WalletService, public alertService: AlertService) { }

  ngOnInit(): void {
  }

  sendTransfer(){
    this.transfer.destinations.map((dest) => dest.amount = dest.amount * 100000000)
    this.wallet.sendTransfer(this.transfer).catch((err) => console.error(err)).then((data: TransferOut) => {
      if(data.fee){
        this.alertService.alert({title: "Transfer Sent", style: AlertStyles.Info, content: `Fee: ${data.fee} <br/>Tx: ${data.tx_hash}<br/> View Key: ${data.tx_key}`})
        this.transfer = {
          destinations: [
            {
              address: '',
              amount: 0
            }
          ],
          mixin: 5,
          unlock_time:0,
          get_tx_key: true,
          payment_id: undefined
        }
      }else{
        console.log(data)
        this.alertService.alert({title: "ERROR", style: AlertStyles.Danger, content: `${data['error']['message']}`})

      }

    })
  }

}
