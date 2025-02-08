import type { RouteRecordRaw } from 'vue-router'

const MainRoutes: RouteRecordRaw = {
  path: '/dashboard',
  component: () => import('@/layouts/BaseLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboards/dashboard1/index.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true
      }
    },
    {
      path: '/ui',
      component: () => import('@/layouts/BaseLayout.vue'),
      meta: {
        title: 'UI Elements',
        requiresAuth: true
      },
      children: [
        {
          name: 'Alert',
          path: '/ui/alert',
          component: () => import('@/views/ui-elements/UiAlert.vue'),
          meta: { title: 'Alert' }
        },
        {
          name: 'Avatar',
          path: '/ui/avatar',
          component: () => import('@/views/ui-elements/UiAvatar.vue'),
          meta: { title: 'Avatar' }
        },
        {
          name: 'Badge',
          path: '/ui/badge',
          component: () => import('@/views/ui-elements/UiBadge.vue'),
          meta: { title: 'Badge' }
        },
        {
          name: 'Button',
          path: '/ui/button',
          component: () => import('@/views/ui-elements/UiButton.vue'),
          meta: { title: 'Button' }
        },
        {
          name: 'Card',
          path: '/ui/card',
          component: () => import('@/views/ui-elements/UiCard.vue'),
          meta: { title: 'Card' }
        },
        {
          name: 'Chip',
          path: '/ui/chip',
          component: () => import('@/views/ui-elements/UiChip.vue'),
          meta: { title: 'Chip' }
        },
        {
          name: 'Dialog',
          path: '/ui/dialog',
          component: () => import('@/views/ui-elements/UiDialog.vue'),
          meta: { title: 'Dialog' }
        },
        {
          name: 'Divider',
          path: '/ui/divider',
          component: () => import('@/views/ui-elements/UiDivider.vue'),
          meta: { title: 'Divider' }
        },
        {
          name: 'Expansion Panel',
          path: '/ui/expansion-panel',
          component: () => import('@/views/ui-elements/UiExpansionPanel.vue'),
          meta: { title: 'Expansion Panel' }
        },
        {
          name: 'Footer',
          path: '/ui/footer',
          component: () => import('@/views/ui-elements/UiFooter.vue'),
          meta: { title: 'Footer' }
        },
        {
          name: 'Hover',
          path: '/ui/hover',
          component: () => import('@/views/ui-elements/UiHover.vue'),
          meta: { title: 'Hover' }
        },
        {
          name: 'Icon',
          path: '/ui/icon',
          component: () => import('@/views/ui-elements/UiIcon.vue'),
          meta: { title: 'Icon' }
        },
        {
          name: 'Image',
          path: '/ui/image',
          component: () => import('@/views/ui-elements/UiImage.vue'),
          meta: { title: 'Image' }
        },
        {
          name: 'List',
          path: '/ui/list',
          component: () => import('@/views/ui-elements/UiList.vue'),
          meta: { title: 'List' }
        },
        {
          name: 'Menu',
          path: '/ui/menu',
          component: () => import('@/views/ui-elements/UiMenu.vue'),
          meta: { title: 'Menu' }
        },
        {
          name: 'Navigation Drawer',
          path: '/ui/navigation-drawer',
          component: () => import('@/views/ui-elements/UiNavigationDrawer.vue'),
          meta: { title: 'Navigation Drawer' }
        },
        {
          name: 'Overlay',
          path: '/ui/overlay',
          component: () => import('@/views/ui-elements/UiOverlay.vue'),
          meta: { title: 'Overlay' }
        },
        {
          name: 'Pagination',
          path: '/ui/pagination',
          component: () => import('@/views/ui-elements/UiPagination.vue'),
          meta: { title: 'Pagination' }
        },
        {
          name: 'Parallax',
          path: '/ui/parallax',
          component: () => import('@/views/ui-elements/UiParallax.vue'),
          meta: { title: 'Parallax' }
        },
        {
          name: 'Progress',
          path: '/ui/progress',
          component: () => import('@/views/ui-elements/UiProgress.vue'),
          meta: { title: 'Progress' }
        },
        {
          name: 'Rating',
          path: '/ui/rating',
          component: () => import('@/views/ui-elements/UiRating.vue'),
          meta: { title: 'Rating' }
        },
        {
          name: 'Select',
          path: '/ui/select',
          component: () => import('@/views/ui-elements/UiSelect.vue'),
          meta: { title: 'Select' }
        },
        {
          name: 'Slider',
          path: '/ui/slider',
          component: () => import('@/views/ui-elements/UiSlider.vue'),
          meta: { title: 'Slider' }
        },
        {
          name: 'Snackbar',
          path: '/ui/snackbar',
          component: () => import('@/views/ui-elements/UiSnackbar.vue'),
          meta: { title: 'Snackbar' }
        },
        {
          name: 'Switch',
          path: '/ui/switch',
          component: () => import('@/views/ui-elements/UiSwitch.vue'),
          meta: { title: 'Switch' }
        },
        {
          name: 'Table',
          path: '/ui/table',
          component: () => import('@/views/ui-elements/UiTable.vue'),
          meta: { title: 'Table' }
        },
        {
          name: 'Tabs',
          path: '/ui/tabs',
          component: () => import('@/views/ui-elements/UiTabs.vue'),
          meta: { title: 'Tabs' }
        },
        {
          name: 'Text Field',
          path: '/ui/text-field',
          component: () => import('@/views/ui-elements/UiTextField.vue'),
          meta: { title: 'Text Field' }
        },
        {
          name: 'Timeline',
          path: '/ui/timeline',
          component: () => import('@/views/ui-elements/UiTimeline.vue'),
          meta: { title: 'Timeline' }
        },
        {
          name: 'Tooltip',
          path: '/ui/tooltip',
          component: () => import('@/views/ui-elements/UiTooltip.vue'),
          meta: { title: 'Tooltip' }
        },
        {
          name: 'Tree View',
          path: '/ui/tree-view',
          component: () => import('@/views/ui-elements/UiTreeView.vue'),
          meta: { title: 'Tree View' }
        },
        {
          name: 'Virtual Scroller',
          path: '/ui/virtual-scroller',
          component: () => import('@/views/ui-elements/UiVirtualScroller.vue'),
          meta: { title: 'Virtual Scroller' }
        },
        {
          name: 'Window',
          path: '/ui/window',
          component: () => import('@/views/ui-elements/UiWindow.vue'),
          meta: { title: 'Window' }
        }
      ]
    }
  ]
}

export default MainRoutes
