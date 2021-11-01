import React from 'react'
import type { UnionToIntersection } from 'ts-essentials'
import { compact, byKey } from '@utils/array'
import { partial } from '@utils/Funcs'

import { dataRowDescToProps, headerRowDescToProps, headerDescToProps, cellDescToProps } from './normalizers'
import {
  TableProps,
  ExtraArgs,
  ExtraArgGenerators,
  NormalizedTableProps,
  ExtraKey,
  TableComponentProps,
  TableComponents,
  TablePlugin,
  PluginProps,
  PluginExtra,
} from './types'

export function makeTable<Components extends TableComponents, Plugin extends TablePlugin>(
  tableComponents: Components,
  plugins: Plugin[] = []
): <T>(
  props: TableProps<
    T,
    TableComponentProps<Components> & { table: UnionToIntersection<PluginProps<Plugin>> },
    { [K in ExtraKey]: UnionToIntersection<PluginExtra<Plugin>[K]> }
  >
) => JSX.Element {
  const {
    table: TableComponent,
    thead: THeadComponent,
    tbody: TBodyComponent,
    headerRow: HeaderRowComponent,
    dataRow: DataRowComponent,
    headerCell: HeaderComponent,
    dataCell: CellComponent,
  } = tableComponents

  const pluginsBefore = compact(plugins.map(({ before }) => before))
  const pluginsAfter = compact(plugins.map(({ after }) => after))

  return (props) => {
    let procProps: TableProps = props
    const allPluginExtraGenerators: ExtraArgGenerators[] = []
    for (let i = 0; i < pluginsBefore.length; i++) {
      const [pluginProps, pluginExtraGenerators] = pluginsBefore[i](procProps)
      procProps = pluginProps
      if (pluginExtraGenerators) {
        allPluginExtraGenerators.push(pluginExtraGenerators)
      }
    }

    const generatorKeys: ExtraKey[] = ['headerRow', 'headerCell', 'dataRow', 'dataCell']
    const compactGenerators = generatorKeys.map(
      (generatorKey) => [generatorKey, compact(byKey(allPluginExtraGenerators, generatorKey))] as const
    )

    const mergedGenerators = Object.fromEntries(
      // TODO: нужно исправить, но пока непонятно как. Очевидно, что необходимо уточнить тип ExtraArgs, так как тм в полях могут быть только словари,
      //  но это аффектит возвращаемы тип makeTable.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      compactGenerators.map(([key, callbacks]) => [key, partial(arrInvokeAndMerge, callbacks as any)])
    ) as Required<ExtraArgGenerators>

    let procNormalizedProps = normalizeProps(procProps, mergedGenerators)

    for (let i = 0; i < pluginsAfter.length; i++) {
      procNormalizedProps = pluginsAfter[i](procNormalizedProps)
    }

    const { table, thead, tbody } = procNormalizedProps

    return (
      <TableComponent {...table}>
        <THeadComponent>
          <HeaderRowComponent {...thead.row}>
            {thead.cells.map(([key, headerProps]) => (
              <HeaderComponent key={key} {...headerProps} />
            ))}
          </HeaderRowComponent>
        </THeadComponent>
        <TBodyComponent>
          {tbody.map(([rowKey, { row: rowProps, cells }]) => (
            <DataRowComponent key={rowKey} {...rowProps}>
              {cells.map(([cellKey, cellProps]) => (
                <CellComponent key={cellKey} {...cellProps} />
              ))}
            </DataRowComponent>
          ))}
        </TBodyComponent>
      </TableComponent>
    )
  }
}

export function normalizeProps<TProps, RProps, HProps, CProps, Extra extends ExtraArgs>(
  { dataRow: dataRowDesc, headerRow: headerRowDesc, columns, getKey, data, ...tableComponentProps }: TableProps,
  extraGenerators: ExtraArgGenerators<Extra>
): NormalizedTableProps<TProps, RProps, HProps, CProps> {
  return {
    table: tableComponentProps as TProps,
    thead: {
      row: headerRowDesc ? headerRowDescToProps(headerRowDesc, extraGenerators.headerRow) : {},
      cells: columns.map(({ name, header }, headerIndex) => [
        name,
        headerDescToProps(header, headerIndex, extraGenerators.headerCell),
      ]),
    },
    tbody: data.map((item, rowIndex) => [
      getKey ? getKey(item, rowIndex) : rowIndex,
      {
        row: dataRowDesc ? dataRowDescToProps(dataRowDesc, item, rowIndex, extraGenerators.dataRow) : {},
        cells: columns.map(({ name, cell }, columnIndex) => [
          name,
          cellDescToProps(cell, item, rowIndex, columnIndex, extraGenerators.dataCell),
        ]),
      },
    ]),
  }
}

function arrInvokeAndMerge<Params extends unknown[], F extends (...p: Params) => Record<string, unknown>>(
  funcs: F[],
  ...params: Params
): Record<string, unknown> {
  return funcs.reduce((acc, f) => ({ ...acc, ...f(...params) }), {})
}
