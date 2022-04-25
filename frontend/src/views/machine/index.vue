<template>
  <div class="test">
    <h2>설비관리</h2>
    <b-col style="text-align: right; padding: 0; margin-bottom: 10px">
      <b-button
        class="btn1"
        variant="dark"
        size="sm"
        style="display: inline-block; float: none; margin: 0"
        @click="onClickAddNew"
        >신규등록</b-button
      >
    </b-col>
    <div>
      <b-table :items="machineList" :fields="fields" style="color: LightGray; text-align: center">
        <template #cell(status)="" class="status">
          <!-- <b-button v-if="this.machine.status[0].status == 'ON'" size="sm" variant="success">ON</b-button> -->
          <!-- <b-button v-else-if="this.machine.status[0].status == 'OFF'" size="sm" variant="danger">삭제</b-button> -->
        </template>
        <template #cell(btn)="row" class="btn">
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickEdit(row.item.id)">수정</b-button>
          <b-button size="sm" variant="dark" @click="onClickDelete(row.item.id)">삭제</b-button>
        </template>
      </b-table>
    </div>
    <!-- {{ this.machine.status[0].status }} -->
    <br />
    {{ this.machineList }}
    <inform />
  </div>
</template>

<script>
import inform from './inform.vue'
export default {
  components: {
    inform: inform
  },
  data() {
    return {
      machine: {
        id: null,
        code: null,
        status: null
      },
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'code', label: '설비' },
        { key: 'status', label: '작동상태' },
        { key: 'btn', label: '비고' }
      ]
    }
  },
  computed: {
    machineList() {
      return this.$store.getters.MachineList
    },
    insertedResult() {
      return this.$store.getters.MachineInsertedResult
    },
    updatedResult() {
      return this.$store.getters.MachineUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.MachineDeletedResult
    }
  },
  watch: {
    // machineList(value) {
    //   if (value !== null) {
    //     this.searchMachineList()
    //   }
    // },
    insertedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          this.searchMachineList()
        } else {
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchMachineList()
        } else {
          // 수정이 실패한 경우
          this.$bvToast.toast('수정이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('삭제 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchMachineList()
        } else {
          // 삭제가 실패한 경우
          this.$bvToast.toast('삭제가 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchMachineList()
    setInterval(() => {
      this.searchMachineList()
    }, 2000)
  },
  methods: {
    searchMachineList() {
      this.$store.dispatch('actMachineList')
      this.machine.status = this.$store.getters.MachineList
      console.log('status', this.machine.status)
      for (let i = 0; i < this.machine.status.length; i++) {
        console.log('반목문 작동 전의 machineList status 값', this.machine.status[i].status)
        this.machineList[i].status = this.machine.status[i].status
        console.log('반목문 작동 후의 machineList status 값', this.machineList[i].status)
        this.machine.status = this.machineList[i].status
        // console.log('반목문 작동 후의 machineList status 값2', this.machine.status)
      }
    },
    onClickAddNew() {
      this.$store.dispatch('actMachineInputMode', 'insert') // 모달을 띄운다.
      this.$store.dispatch('actMachineInit')
      this.$bvModal.show('modal-machine-inform')
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보
      // 1. 입력모드 설정
      this.$store.dispatch('actMachineInputMode', 'update')

      // 2. 상세정보 호출
      this.$store.dispatch('actMachineInfo', id)

      // 3. 모달 출력
      this.$bvModal.show('modal-machine-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actMachineDelete', id)
        }
      })
    }
  }
}
</script>
<style>
.test {
  margin-top: 50px;
  margin-left: 100px;
  margin-right: 100px;
}
table td:last-child {
  width: 17%;
}
.item_btn {
  margin-right: 5px;
}
</style>
