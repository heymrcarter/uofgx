<template>
  <v-card flat>
    <v-card-title class="subheading">Activity details</v-card-title>

    <v-card-text>
      <v-data-table
        hide-actions
        color="yellow"
        :headers="tableHeaders"
        :items="data"
        :loading="loading ? 'yellow' : false">

        <template slot="items" slot-scope="props">
          <tr>
            <td><v-icon>{{ props.item.icon }}</v-icon></td>
            <td>{{ props.item.player }}</td>
            <td>{{ props.item.class }}</td>
            <td>{{ props.item.power }}</td>
            <td>{{ props.item.kills }}</td>
            <td>{{ props.item.deaths }}</td>
          </tr>
        </template>

      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import activityContent from '@/content/activity'
export default {
  name: 'activity-detail-table',
  props: {
    loading: {
      required: true,
      type: Boolean
    },
    data: {
      required: false,
      type: Array
    }
  },
  computed: {
    tableHeaders() {
      return activityContent.detailTableHeaders
    }
  }
}
</script>
