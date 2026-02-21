import { styles } from './NoSolutionModal.styles'
import type { NoSolutionModalProps } from './NoSolutionModal.types'

const NoSolutionModal = ({
  open,
  onClose,
  failedCalculations,
  centsToStr,
}: NoSolutionModalProps) => {
  if (!open) return null

  let message = ''

  if (failedCalculations.length === 1) {
    const failed = failedCalculations[0]
    if (failed.reason === 'no_items') {
      message = `Не удалось найти комбинацию для суммы <strong>${centsToStr(failed.targetCents)}</strong>.<br><br>Нет доступных товаров для расчета.`
    } else {
      message = `Не удалось найти точную комбинацию для суммы <strong>${centsToStr(failed.targetCents)}</strong>.<br><br>Попробуйте изменить сумму или проверьте доступные товары.`
    }
  } else {
    const amounts = failedCalculations.map((f) => centsToStr(f.targetCents)).join(', ')
    const noItemsCount = failedCalculations.filter((f) => f.reason === 'no_items').length
    const noCombinationCount = failedCalculations.filter((f) => f.reason === 'no_combination').length

    message = `Не удалось найти комбинации для следующих сумм:<br><strong>${amounts}</strong><br><br>`
    if (noItemsCount > 0) {
      message += `• ${noItemsCount} расчет${noItemsCount > 1 ? 'ов' : ''} не выполнен${noItemsCount > 1 ? 'ы' : ''} - нет доступных товаров<br>`
    }
    if (noCombinationCount > 0) {
      message += `• ${noCombinationCount} расчет${noCombinationCount > 1 ? 'ов' : ''} не выполнен${noCombinationCount > 1 ? 'ы' : ''} - точная комбинация не найдена`
    }
  }

  return (
    <div style={styles.modal as React.CSSProperties} onClick={onClose}>
      <div style={styles.content as React.CSSProperties} onClick={(e) => e.stopPropagation()}>
        <div style={styles.title as React.CSSProperties}>Внимание</div>
        <div
          style={styles.message as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: message }}
        />
        <button style={styles.button as React.CSSProperties} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default NoSolutionModal
