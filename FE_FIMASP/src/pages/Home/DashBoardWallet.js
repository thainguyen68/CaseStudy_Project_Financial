import("./AWalletElement.css")
export default function DashBoardWalletElement({wallet}){
    return(
        <div className={"wallet-block"}>
            <div className={"wallet"} style={{backgroundImage: wallet.backgroundColor}}>
                <p className={"logoName"}>Fimasp</p>
                <i className={"fa-light "+wallet.icon}></i>
                <div className={"walletDetail"}>
                    <p>Wallet 's name:</p>
                    <p className={"walletName"}>{wallet.name}</p>
                </div>
                <div className={"walletMoney"}>
                    <p>{wallet.totalMoney}</p>
                </div>
                <div className={"walletLimit"}>
                    <p>Limit:</p>
                    <p className={"walletName"}>{wallet.limitMoney}</p>
                </div>
            </div>
        </div>
    )
}