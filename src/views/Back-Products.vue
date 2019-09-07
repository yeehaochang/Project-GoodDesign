<template>
  <div>
    <Alert></Alert>
    <loading :active.sync="isLoading"></loading>
    <nav class="nav justify-content-center">
      <a
        class="nav-link ml-auto text-main h4"
        href="#"
        data-toggle="modal"
        data-target="#addProduct"
        @click.prevent="openModal(true)"
      >新增商品</a>
    </nav>
    <table class="table">
      <thead>
        <tr class="thead-dark">
          <th></th>
          <th class="d-none d-md-block pt-5">圖片</th>
          <th width="150">標題</th>
          <th width="100">種類</th>
          <!-- <th>內容</th> -->
          <!-- <th>描述</th> -->
          <th width="220px">ID</th>
          <!-- <th>圖片</th> -->
          <th class="text-success">啟用</th>
          <!-- <th>原價</th> -->
          <th width="80">定價</th>
          <th>數量</th>
          <th>單位</th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>
            <a href="#" class="text-general" @click.prevent="removeProduct(item.id)">
              <i class="fas fa-trash-alt"></i>
            </a>
          </td>
          <td class="d-none d-md-block">
            <img :src="item.imageUrl" class="bg-cover" alt width="100px" height="100px" srcset />
          </td>
          <td>{{item.title}}</td>
          <td>{{item.category}}</td>
          <!-- <td>{{item.content}}</td> -->
          <!-- <td>{{item.description}}</td> -->
          <td>{{item.id}}</td>
          <!-- <td>{{item.image}}</td> -->
          <td>{{item.is_enabled}}</td>
          <!-- <td>{{item.origin_price}}</td> -->
          <td>{{item.price|currency}}</td>
          <td>{{item.num}}</td>
          <td>{{item.unit}}</td>

          <td width="80">
            <a href="#" class="text-general" @click.prevent="openModal(false,item)">
              <i class="fas fa-cog"></i>修改
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 新增商品modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      @keyup.enter="updateEdit"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" @click="openModal">新增商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- 新增商品內容 -->
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">標題 Title</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="tempProduct.title"
                    id="inputEmail4"
                    placeholder="請輸入標題"
                    v-validate="'required'"
                    name="title"
                  />
                  <small class="text-danger" v-if="errors.has('title')">此欄位不得為空</small>
                </div>
                <div class="form-group col-12 col-md-6">
                  <label for="inputCategory">類別 category</label>
                  <select id="inputCategory" v-model="tempProduct.category" class="form-control">
                    <option>手作服飾</option>
                    <option>家居用品</option>
                    <option>手工配件</option>
                    <option>休閒娛樂</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-6">
                  <label for="originPrice">原價 origin_price</label>
                  <input
                    type="number"
                    v-model="tempProduct.origin_price"
                    class="form-control"
                    id="originPrice"
                    v-validate="'required'"
                    name="originprice"
                  />
                  <small class="text-danger" v-if="errors.has('originprice')">此欄位不得為空</small>
                </div>
                <div class="form-group col-6">
                  <label for="price">定價 price</label>
                  <input
                    type="number"
                    v-model="tempProduct.price"
                    class="form-control"
                    id="price"
                    v-validate="'required'"
                    name="price"
                  />
                  <small class="text-danger" v-if="errors.has('price')">此欄位不得為空</small>
                </div>
                <div class="form-group col-3">
                  <label for="num">數量 num</label>
                  <input
                    type="number"
                    v-model="tempProduct.num"
                    class="form-control"
                    id="num"
                    v-validate="'required'"
                    name="num"
                  />
                  <small class="text-danger" v-if="errors.has('num')">此欄位不得為空</small>
                </div>
                <div class="form-group col-3">
                  <label for="unit">單位 unit</label>
                  <input
                    type="text"
                    v-model="tempProduct.unit"
                    class="form-control"
                    id="unit"
                    v-validate="'required'"
                    name="unit"
                  />
                  <small class="text-danger" v-if="errors.has('unit')">此欄位不得為空</small>
                </div>

                <div class="form-group col-6">
                  <label for="imageUpdate">圖片 image</label>
                  <i class="fas fa-circle-notch fa-spin" v-if="isFileLoading"></i>
                  <input
                    type="file"
                    class="form-control"
                    id="imageUpdate"
                    ref="files"
                    @change="updateImage"
                    v-validate="'required'"
                    name="img"
                  />
                  <small class="text-danger" v-if="errors.has('img')">此欄位不得為空</small>
                  <img :src="tempProduct.imageUrl" class="img-fluid" />
                </div>
                <div class="form-group col-md-6 col-12">
                  <label for="inputState">商品描述 description</label>
                  <input
                    type="text"
                    v-model="tempProduct.description"
                    class="form-control"
                    id="unit"
                    v-validate="'required'"
                    name="description"
                  />
                  <small class="text-danger" v-if="errors.has('description')">此欄位不得為空</small>
                  <label for="content">內容 content</label>
                  <input
                    type="text"
                    v-model="tempProduct.content"
                    class="form-control"
                    id="content"
                    v-validate="'required'"
                    name="content"
                  />
                  <small class="text-danger" v-if="errors.has('content')">此欄位不得為空</small>
                </div>

                <div class="form-group col-6 my-auto">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                    name="isenabled"
                  />
                  <!-- <small class="text-danger" v-if="errors.has('isenabled')">此欄位不得為空</small> -->
                  <label class="form-check-label" for="is_enabled">是否啟用 is_enabled</label>
                </div>
                <div class="form-group col-12">
                  <label for="imageUrl">圖片網址 imageUrl</label>
                  <input
                    type="text"
                    v-model="tempProduct.imageUrl"
                    class="form-control"
                    id="imageUrl"
                    v-validate="'required'"
                    name="imgurl"
                  />
                  <small class="text-danger" v-if="errors.has('imgurl')">此欄位不得為空</small>
                </div>
              </div>

              <!-- <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" v-model="isCurrect" type="checkbox" id="isCurrect" />
                  <label class="form-check-label" for="isCurrect">資料確認完畢</label>
                </div>
              </div>-->
            </form>
            <!-- 內容尾 -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-general" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-main" @click.prevent="updateEdit">確認送出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Alert from '../components/Alert'

export default {
  components: {
    Alert
  },
  data () {
    return {
      products: [],
      tempProduct: {},
      isLoading: false,
      isFileLoading: false,
      isNew: false
    }
  },
  methods: {
    getProducts () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/all`
      this.$http.get(api).then(response => {
        vm.products = response.data.products
        console.log('這是所有商品', response)
        if (!response.data.success) {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
        vm.isLoading = false
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.isNew = true
        this.tempProduct = {}
      } else {
        this.isNew = false
        this.tempProduct = Object.assign({}, item)
      }
      $('#productModal').modal('show')
    },
    updateImage () {
      console.log(this)
      const vm = this
      vm.isFileLoading = true
      const updatedFile = vm.$refs.files.files[0]
      const formdata = new FormData()
      formdata.append('file-to-upload', updatedFile)
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.$http
        .post(api, formdata, {
          // 為將格式改成formdata格式故寫入此header
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          if (response.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
            vm.$bus.$emit('message:push', '圖片上傳成功', 'main')
          } else {
            vm.$bus.$emit('message:push', '圖片上傳失敗', 'danger')
          }
          vm.isFileLoading = false
        })
      // this.isFileLoading = true;
      // const file = event.target.files.item(0); //取得file物件
      // const reader = new FileReader(); //建立fileReader 監聽 load 事件
      // reader.addEventListener('load', this.imageLoader);
      // reader.readAsDataURL(file);
      // 在Vue實體中，於methods建立fileSelected方法，當檔案按鈕觸發change事件時，
      // 會取得file物件，此時利用FileReader監聽 Load事件，取得圖檔被轉成Base64格式的URL
      // 再把URL 綁到 img 的src 即可
    },
    // imageLoader(e) {
    //   this.tempProduct.image = e.target.result;
    //   this.isFileLoading = false;
    // },
    updateEdit () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let method = ''
      if (vm.isNew) {
        method = 'post'
      } else {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        method = 'put'
      }
      this.$http[method](api, { data: vm.tempProduct }).then(response => {
        this.getProducts()
        this.tempProduct = {}
        $('#productModal').modal('hide')
        this.$bus.$emit('message:push', response.data.message, 'main')
      })
    },
    removeProduct (id) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`
      this.$http.delete(api).then(response => {
        this.getProducts()
        vm.isLoading = false
        this.$bus.$emit('message:push', response.data.message, 'main')
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
td,
img,
div {
  vertical-align: middle;
}
</style>
