<template>
      <div style="height:100%">
  <!-- scroll start -->
                    <router-view></router-view>
        <!-- scroll end -->
      </div>
            <!-- <div class="sellcard_list">

          
              <div class="sellcard_top">
                <div 
                class="sellcard_img"
                :style="{ background: 'url(' + img + ')' + 'center center' }"
                >
                </div>
                <div class="sellcard_text">
                  <p class="text1">{{text}}</p>
                  <p class="color_red">{{amount | percentage | addUS}}</p>
                </div>
              </div>
              <div class="sellcard_bottom">
                <p class="text1">售卖价格</p>
                <p class="sellcard_input"><input type="number" v-model="saleAmount" :placeholder="'请设置售卖价格(最高' + saleAmount1 + '元)'"></p>
              </div>
          </div>
         </div>
         <div @click="saleCashCard(cashCardId)"  class="button_btn">确认</div>
         <div @click="saleCashCard1()"  class="button_btn">确认</div> -->
         
      

    
</template>


<style lang="less" src="./index.less" scoped>

</style>