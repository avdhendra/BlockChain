import {createSelector} from 'reselect';
import {get,groupBy,reject,maxBy,minBy} from 'lodash';
import { ethers } from 'ethers';
import moment from 'moment'

const GREEN='#25CE8F'
const RED='#F45353'

const account=state=>get(state,'provider.account')
const tokens=state=>get(state,'tokens.contracts')
const events=state=>get(state,'exchange.events')

const allOrders=state=>get(state,'exchange.allOrders.data',[])
const cancelledOrders=state=>get(state,'exchange.cancelledOrders.data',[])
const filledOrders=state=>get(state,'exchange.filledOrders.data',[])

const openOrders=state=>{
    const all=allOrders(state)
    const filled=filledOrders(state)
    const cancelled=cancelledOrders(state)
    const openOrders=reject(all,(order)=>{
        const orderFilled=filled.some((o)=>o.id.toString()===order.id.toString())
        const orderCancelled=cancelled.some((o)=>o.id.toString()===order.id.toString())
        return (orderFilled || orderCancelled)
    })
    return openOrders
}




//-------------------------------------------------------------
//MY events
export const myEventSelector=createSelector(
    account,
    events,
    (account,events)=>{
        events=events.filter((e)=>e.args.user===account)
        console.log(events)
        return events
    }
)


//---------------------------------------------------------------
//My Open Orders

export const myOpenOrdersSelector=createSelector(
    account,
    tokens,
    openOrders,
    (account,tokens,orders)=>{
        if(!tokens[0]||!tokens[1]){
            return
        }
        //Filter orders created by current account
        orders=orders.filter((o)=>o.user===account)
        //Filter orders by token addresses
        orders=orders.filter((o)=>o.tokenGet===tokens[0].address || o.tokenGet===tokens[1].address)
        orders=orders.filter((o)=>o.tokenGive===tokens[0].address || o.tokenGive===tokens[1].address)

        //Decorate Orders - add display attribute
        orders=decorateMyopenOrders(orders,tokens)
        //sort orders by date descending
        orders=orders.sort((a,b)=>b.timestamp-a.timestamp)
        return orders
    }
)

const decorateMyopenOrders=(orders,tokens)=>{
    return(
orders.map((order)=>{
    order=decorateOrder(order,tokens)
    order=decorateMyopenOrder(order,tokens)
    return(order)
})
    )
}

const decorateMyopenOrder=(order,tokens)=>{
    let orderType=order.tokenGive===tokens[1].address?'buy':'sell'

    return({
        ...order,
        orderType,
        orderTypeClass:(orderType==='buy'?GREEN:RED)
    })
}

const decorateOrder=(order,tokens)=>{
    let token0Amount,token1Amount

    //Note:Dapp should be considered token0 ,mETH is considered token1
    //Example:Giving mETH in Exchange for Dapp

    if(order.tokenGive===tokens[1].address){
        token0Amount=order.amountGive //The amount of Dapp we are giving
        token1Amount=order.amountGet //the amount of mEth we want..

    }else{
        token0Amount=order.amountGet //The amount of Dapp we want
        token1Amount=order.amountGive //The amount of mETH we are giving 

    }

    //Calculate token price to 5 decimal places
    const precision=100000
    let tokenPrice=(token1Amount/token0Amount)
    tokenPrice=Math.round(tokenPrice*precision)/precision

    return ({
        ...order,
        token1Amount:ethers.utils.formatUnits(token1Amount,'ether'),
        token0Amount:ethers.utils.formatUnits(token0Amount,'ether'),
        tokenPrice,
        formattedTimestamp:moment.unix(order.timestamp).format('h:mm:ssa d MMM D')

    })

}

    //----------------------------------------------------------------------
    //ALL Filled Orders
    export const filledOrdersSelector=createSelector(
        filledOrders,
        tokens,
        (orders,tokens)=>{
            if(!tokens[0]||!tokens[1]){
                return
            }
            //Filter orders by selected tokens
            orders=orders.filter((o)=>o.tokenGet===tokens[0].address||o.tokenGet===tokens[1].address)
            orders=orders.filter((o)=>o.tokenGet===tokens[0].address || o.tokenGive===tokens[1].address)

            //Sort orders by time ascending for price comparision
            orders=orders.sort((a,b)=>a.timestamp-b.timestamp)
            //Decorate the orders
            orders=decorateFilledOrders(orders,tokens)
            //Sort orders by date descending for display
            orders=orders.sort((a,b)=>b.timestamp-a.timestamp)
            return orders
        }
    )

const decorateFilledOrders=(orders,tokens)=>{
    //Track previous order to compare history
    let previousOrder=orders[0]
    return(
        orders.map((order)=>{
            //decorate each individual order
            order=decorateOrder(order,tokens)
            order=decorateFilledOrder(order,previousOrder)
            previousOrder=order //update the previous order once its decorated
            return order
})
    )
}

const decorateFilledOrder=(order,previousOrder)=>{
    return({
        ...order,
        tokenPriceClass:tokenPriceClass(order.tokenPrice,order.id,previousOrder)

    })
}

const tokenPriceClass=(tokenPrice,orderId,previousOrder)=>{
    //if green Price if only one order exists
    if(previousOrder.id===orderId)
    {
        return GREEN
    }

    //Show green price if order price higher than previous order
    //Show red price if order price lower than previous order
    if(previousOrder.tokenPrice<=tokenPrice){
        return GREEN //success
    }else{
        return RED //danger
    }
}

//------------------------------------------------------------------
//MY Filled Orders

export const myFilledOrdersSelector=createSelector(
    account,
    tokens,
    filledOrders,
    (account,tokens,orders)=>{
        if(!tokens[0]||!tokens[1]){
            return
        }
        //Find our orders
        orders=orders.filter((o)=>o.user===account||o.creator===account)
        //filter orders for current trading pair
        orders=orders.filter((o)=>o.tokenGet===tokens[0].address ||o.tokenGet===tokens[1].address)
        //Sort by data descending
        orders=orders.sort((a,b)=>b.timestamp-a.timestamp)
        //decorate order -add display attribute
        orders=decorateMyFilledOrders(orders,account,tokens)
        return orders
    }
)
const decorateMyFilledOrders = (order,account,tokens)=>{
    const myOrder=order.creator===account

    let orderType
    if(myOrder){
        orderType=order.tokenGive===tokens[1].address ?'buy':'sell'

    }else{
        orderType=order.tokenGive===tokens[1].address?'sell':'buy'
    }
    return({
        ...order,
        orderType,
        orderClass: (orderType === 'buy' ? GREEN : RED),
        orderSign: (orderType === 'buy' ? '+' : '-')
      })

}

//-------------------------------------------------------------------------------------
