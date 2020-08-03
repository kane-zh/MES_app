import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'
import Login from '@/views/login/login'

Vue.use(Router)
export default new Router({
  mode: 'hash',
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      // 主界面
      path: '/home',
      name: 'Home', //
      component: Home,
      children: [
        {
          // 用户信息设置
          path: 'userInfor',
          name: 'userInfor',
          component: () => import('@/views/home/content/user/UserInfor')
        },
        {
          // 密码更改
          path: 'changePasswd',
          name: 'changePasswd',
          component: () => import('@/views/home/content/user/ChangePasswd')
        },
        {
          // 关于我们
          path: 'about',
          name: 'about',
          component: () => import('@/views/home/content/user/About')
        },
        {
          // 物料信息
          path: 'materialInfor',
          name: 'materialInfor',
          component: () => import('@/views/home/content/process/MaterialInfor')
        },
        {
          // 半成品信息
          path: 'semifinishedInfor',
          name: 'semifinishedInfor',
          component: () => import('@/views/home/content/process/SemifinishedInfor')
        },
        {
          // 产品定义
          path: 'productInfor',
          name: 'productInfor',
          component: () => import('@/views/home/content/process/ProductInfor')
        },
        {
          // 生产路径信息
          path: 'productRouteInfor',
          name: 'productRouteInfor',
          component: () => import('@/views/home/content/process/ProductRouteInfor')
        },
        {
          // 工艺看板信息
          path: 'processBoard',
          name: 'processBoard',
          component: () => import('@/views/home/content/process/ProcessBoard')
        },
        {
          // 仓位信息
          path: 'positionInfor',
          name: 'positionInfor',
          component: () => import('@/views/home/content/warehouse/PositionInfor')
        },
        {
          // 设备管理
          path: 'equipmentManage',
          name: 'equipmentManage',
          component: () => import('@/views/home/content/warehouse/EquipmentManage')
        },
        {
          // 配件管理
          path: 'partsManage',
          name: 'partsManage',
          component: () => import('@/views/home/content/warehouse/PartsManage')
        },
        {
          // 原材料管理
          path: 'materialManage',
          name: 'materialManage',
          component: () => import('@/views/home/content/warehouse/MaterialManage')
        },
        {
          // 半成品管理
          path: 'semifinishedManage',
          name: 'semifinishedManage',
          component: () => import('@/views/home/content/warehouse/SemifinishedManage')
        },
        {
          // 产品管理
          path: 'productManage',
          name: 'productManage',
          component: () => import('@/views/home/content/warehouse/ProductManage')
        },
        {
          // 设备库存信息
          path: 'equipmentStockInfor',
          name: 'equipmentStockInfor',
          component: () => import('@/views/home/content/warehouse/EquipmentStockInfor')
        },
        {
          // 配件库存信息
          path: 'partsStockInfor',
          name: 'partsStockInfor',
          component: () => import('@/views/home/content/warehouse/PartsStockInfor')
        },
        {
          // 原材库存信息
          path: 'materialStockInfor',
          name: 'materialStockInfor',
          component: () => import('@/views/home/content/warehouse/MaterialStockInfor')
        },
        {
          // 半成库存信息
          path: 'semifinishedStockInfor',
          name: 'semifinishedStockInfor',
          component: () => import('@/views/home/content/warehouse/SemifinishedStockInfor')
        },
        {
          // 产品库存信息
          path: 'productStockInfor',
          name: 'productStockInfor',
          component: () => import('@/views/home/content/warehouse/ProductStockInfor')
        },
        {
          // 设备库存详情
          path: 'equipmentStockDetail',
          name: 'equipmentStockDetail',
          component: () => import('@/views/home/content/warehouse/EquipmentStockDetail')
        },
        {
          // 配件库存详情
          path: 'partsStockDetail',
          name: 'partsStockDetail',
          component: () => import('@/views/home/content/warehouse/PartsStockDetail')
        },
        {
          // 原材库存详情
          path: 'materialStockDetail',
          name: 'materialStockDetail',
          component: () => import('@/views/home/content/warehouse/MaterialStockDetail')
        },
        {
          // 半成库存详情
          path: 'semifinishedStockDetail',
          name: 'semifinishedStockDetail',
          component: () => import('@/views/home/content/warehouse/SemifinishedStockDetail')
        },
        {
          // 产品库存详情
          path: 'productStockDetail',
          name: 'productStockDetail',
          component: () => import('@/views/home/content/warehouse/ProductStockDetail')
        },
        {
          // 仓库看板信息
          path: 'warehouseBoard',
          name: 'warehouseBoard',
          component: () => import('@/views/home/content/warehouse/WarehouseBoard')
        },
        {
          // 缺陷信息
          path: 'defectInfor',
          name: 'defectInfor',
          component: () => import('@/views/home/content/quality/DefectInfor')
        },
        {
          // 检验标准信息
          path: 'inspectionStandard',
          name: 'inspectionStandard',
          component: () => import('@/views/home/content/quality/InspectionStandard')
        },
        {
          // 检验记录
          path: 'inspectionRecord',
          name: 'inspectionRecord',
          component: () => import('@/views/home/content/quality/InspectionRecord')
        },
        {
          // 品质看板
          path: 'qualityBoard',
          name: 'qualityBoard',
          component: () => import('@/views/home/content/quality/QualityBoard')
        },
        {
          // 设备厂商信息
          path: 'equipmentVendor',
          name: 'equipmentVendor',
          component: () => import('@/views/home/content/equipment/EquipmentVendor')
        },
        {
          // 配件信息
          path: 'partsInfor',
          name: 'partsInfor',
          component: () => import('@/views/home/content/equipment/PartsInfor')
        },
        {
          // 设备信息
          path: 'equipmentInfor',
          name: 'equipmentInfor',
          component: () => import('@/views/home/content/equipment/EquipmentInfor')
        },
        {
          // 维护记录
          path: 'maintainRecord',
          name: 'maintainRecord',
          component: () => import('@/views/home/content/equipment/MaintainRecord')
        },
        {
          // 备品消耗记录
          path: 'partsUseRecord',
          name: 'partsUseRecord',
          component: () => import('@/views/home/content/equipment/PartsUseRecord')
        },
        {
          // 设备状态信息
          path: 'equipmentState',
          name: 'equipmentState',
          component: () => import('@/views/home/content/equipment/EquipmentState')
        },

        {
          // 设备看板信息
          path: 'equipmentBoard',
          name: 'equipmentBoard',
          component: () => import('@/views/home/content/equipment/EquipmentBoard')
        },
        {
          // 班组信息
          path: 'teamInfor',
          name: 'teamInfor',
          component: () => import('@/views/home/content/production/TeamInfor')
        },
        {
          // 技能信息
          path: 'skillInfor',
          name: 'skillInfor',
          component: () => import('@/views/home/content/production/SkillInfor')
        },
        {
          // 人员信息
          path: 'personnelInfor',
          name: 'personnelInfor',
          component: () => import('@/views/home/content/production/PersonnelInfor')
        },
        {
          // 考核记录
          path: 'assessmentRecord',
          name: 'assessmentRecord',
          component: () => import('@/views/home/content/production/AssessmentRecord')
        },
        {
          // 半成品日报
          path: 'semifinishedDailyReport',
          name: 'semifinishedDailyReport',
          component: () => import('@/views/home/content/production/SemifinishedDailyReport')
        },
        {
          // 产品日报
          path: 'productDailyReport',
          name: 'productDailyReport',
          component: () => import('@/views/home/content/production/ProductDailyReport')
        },
        {
          // 生产看板信息
          path: 'productionBoard',
          name: 'productionBoard',
          component: () => import('@/views/home/content/production/ProductionBoard')
        },
        {
          // 供应商信息
          path: 'vendorInfor',
          name: 'vendorInfor',
          component: () => import('@/views/home/content/plan/VendorInfor')
        },
        {
          // 客户信息
          path: 'clientInfor',
          name: 'clientInfor',
          component: () => import('@/views/home/content/plan/ClientInfor')
        },
        {
          // 销售订单创建
          path: 'salesOrderCreate',
          name: 'salesOrderCreate',
          component: () => import('@/views/home/content/plan/SalesOrderCreate')
        },
        {
          // 产品生产任务单创建
          path: 'productTaskCreate',
          name: 'productTaskCreate',
          component: () => import('@/views/home/content/plan/ProductTaskCreate')
        },
        {
          // 半成品生产任务单创建
          path: 'seminishedTaskCreate',
          name: 'seminishedTaskCreate',
          component: () => import('@/views/home/content/plan/SeminishedTaskCreate')
        },
        {
          // 采购需求
          path: 'purchaseRequire',
          name: 'purchaseRequire',
          component: () => import('@/views/home/content/plan/PurchaseRequire')
        },
        {
          // 原材料仓库管理计划
          path: 'materialManagePlan',
          name: 'materialManagePlan',
          component: () => import('@/views/home/content/plan/MaterialManagePlan')
        },
        {
          // 半成品仓库管理计划
          path: 'semifinishedManagePlan',
          name: 'semifinishedManagePlan',
          component: () => import('@/views/home/content/plan/SemifinishedManagePlan')
        },
        {
          // 产品仓库管理计划
          path: 'productManagePlan',
          name: 'productManagePlan',
          component: () => import('@/views/home/content/plan/ProductManagePlan')
        },
        {
          // 设备维护计划
          path: 'equipmentMaintainPlan',
          name: 'equipmentMaintainPlan',
          component: () => import('@/views/home/content/plan/EquipmentMaintainPlan')
        },
        {
          // 计划看板信息
          path: 'planBoard',
          name: 'planBoard',
          component: () => import('@/views/home/content/plan/PlanBoard')
        }

      ]
    },
    {
      // 登录界面
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
