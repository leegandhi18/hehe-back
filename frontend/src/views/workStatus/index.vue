<template>
  <div class="test">
    <h2>작업현황</h2>
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
      <h2>작업중 리스트</h2>
      <b-table :items="workingList" :fields="workingFields" style="color: LightGray; text-align: center">
        <template #cell(startTime)="row">
          {{ row.item.startTime.substring(0, 16) }}
        </template>
        <template #cell(control)="row" class="control">
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickStop(row.item.id)">작업 중단</b-button>
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickComplete(row.item.id)">작업 완료</b-button>
        </template>
        <!-- <template #cell(btn)="row" class="btn">
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickEdit(row.item.id)">수정</b-button>
          <b-button size="sm" variant="dark" @click="onClickDelete(row.item.id)">삭제</b-button>
        </template> -->
      </b-table>
    </div>
    <div>
      <h2>작업전 리스트</h2>
      <!-- {{ Date.now() }} -->
      <!-- {{ new Date().toISOString() }} -->
      <b-table :items="beforeWorkingList" :fields="beforeWorkingFields" style="color: LightGray; text-align: center">
        <template #cell(startTime)="row">
          {{ row.item.startTime.substring(0, 16) }}
        </template>
        <template #cell(control)="row" class="control">
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickStart(row.item.id)">작업 시작</b-button>
        </template>
        <template #cell(btn)="row" class="btn">
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickEdit(row.item.id)">수정</b-button>
          <b-button size="sm" variant="dark" @click="onClickDelete(row.item.id)">삭제</b-button>
        </template>
      </b-table>
    </div>
    <inform />
    <inform2 />
  </div>
</template>

<script>
import inform from './inform.vue'
import inform2 from './inform2.vue'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    inform: inform,
    inform2: inform2
  },
  data() {
    return {
      work: {
        id: null,
        workNum: null,
        name: null,
        machineCode: null,
        itemName: null,
        productQuantity: null,
        totalQuantity: null,
        goodQuantity: null,
        badQuantity: null,
        startTime: null,
        endTime: null,
        time: null,
        workStatus: null,
        description: null
      },
      beforeWorkingFields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: '작업자' },
        { key: 'machineCode', label: '설비' },
        { key: 'itemName', label: '품목' },
        { key: 'productQuantity', label: '수량' },
        { key: 'startTime', label: '시작시간' },
        { key: 'control', label: '작업상태 제어' },
        { key: 'btn', label: '비고' }
        // { key: 'workStatus', label: '작업상태' }
        // { key: 'deleteBtn', label: '삭제' }
      ],
      workingFields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: '작업자' },
        { key: 'machineCode', label: '설비' },
        { key: 'itemName', label: '품목' },
        { key: 'productQuantity', label: '수량' },
        { key: 'startTime', label: '시작시간' },
        { key: 'control', label: '작업상태 제어' }
        // { key: 'btn', label: '비고' }
        // { key: 'workStatus', label: '작업상태' }
        // { key: 'deleteBtn', label: '삭제' }
      ]
    }
  },
  computed: {
    beforeWorkingList() {
      return this.$store.getters.BeforeWorkingList
    },
    workingList() {
      return this.$store.getters.WorkingList
    },
    insertedResult() {
      return this.$store.getters.WorkInsertedResult
    },
    updatedResult() {
      return this.$store.getters.WorkUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.WorkDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      // 등록 후 처리
      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchBeforeWorkingList()
          this.searchWorkingList()
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      // 수정 후 처리
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
          this.searchBeforeWorkingList()
          this.searchWorkingList()
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
          this.searchBeforeWorkingList()
          this.searchWorkingList()
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
    this.searchBeforeWorkingList()
    this.searchWorkingList()
  },
  methods: {
    searchBeforeWorkingList() {
      this.$store.dispatch('actBeforeWorkingList')
    },
    searchWorkingList() {
      this.$store.dispatch('actWorkingList')
    },
    onClickAddNew() {
      // 신규 등록
      // 1. 입력모드 설정
      this.$store.dispatch('actWorkInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actWorkInit')

      // 3. 모달 출력
      this.$bvModal.show('modal-work-inform')
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actWorkInputMode', 'update')

      // 2. 상세정보 호출
      this.$store.dispatch('actWorkInfo', id)

      // 3. 모달 출력
      this.$bvModal.show('modal-work-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actWorkDelete', id)
        }
      })
    },
    async onClickStart(id) {
      console.log('작업 시작')
      // 작업 시작 버튼을 누른 해당 리스트 상세 조회
      await this.$store.dispatch('actWorkInfo', id)
      this.work = this.$store.getters.Work

      // workStatus의 작업상태를 1로 바꿔준다.
      this.work.workStatus = 1
      this.work.workNum = id
      console.log('시작버튼 누를 시 workNum', this.work.workNum)

      // 바꿔준 work의 값을 수정해준다.
      await this.$store.dispatch('actWorkUpdate', this.work) // 수정 실행
      console.log('시작버튼 누를 시 데이터', this.work)
    },
    async onClickComplete(id) {
      console.log('작업 완료')
      // 작업 완료 버튼을 누른 해당 리스트 상세 조회
      await this.$store.dispatch('actWorkInfo', id)
      this.work = this.$store.getters.Work

      // workStatus의 작업상태를 바꿔준다. (작업 완료)
      this.work.workStatus = 2
      this.work.workNum = id
      console.log('완료버튼 누를 시 workNum', this.work.workNum)
      this.work.endTime = new Date().toISOString()
      console.log('work.endTime', this.work.endTime)

      // 바꿔준 work의 값을 수정해준다.
      await this.$store.dispatch('actWorkUpdate', this.work)
      await this.$store.dispatch('actWorkHistoryInsert', this.work) // 작업 완료
      console.log('완료 이력에 넘겨준 데이터', this.work)
    },
    async onClickStop(id) {
      // 작업 중단 버튼을 누른 해당 리스트 상세 조회
      await this.$store.dispatch('actWorkInfo', id)
      // 상세정보 초기화
      await this.$store.dispatch('actWorkStopInit')
      // 작업 중단 모달 생성
      this.$bvModal.show('modal-stop-inform')
      console.log('작업 중단')
      this.work = this.$store.getters.Work
      this.work.workNum = id

      // setTimeout(() => {
      //   // workStatus의 작업상태를 바꿔준다. // 작업 중단
      //   this.work.workStatus = 3
      //   this.work.workNum = id
      //   console.log('중단버튼 누를 시 workNum', this.work.workNum)
      //   this.work.endTime = new Date().toISOString()
      //   this.work.time = new Date().toISOString()
      //   console.log('work.endTime', this.work.endTime)
      //   console.log('work.Time', this.work.time)
      // }, 700) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      // setTimeout(() => {
      //   // 바꿔준 work의 값을 수정해준다.
      //   this.$store.dispatch('actWorkUpdate', this.work)
      //   this.$store.dispatch('actWorkHistoryInsert', this.work) // 완료이력에 남긴다
      //   console.log('중단 이력에 넘겨준 데이터', this.work)
      // }, 1100) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      // setTimeout(() => {
      //   // 바꿔준 work의 값을 수정해준다.
      //   this.$store.dispatch('actWorkStopInsert', this.work) // 작업 중단
      // }, 1500) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
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
div {
  color: LightGray;
}
</style>
