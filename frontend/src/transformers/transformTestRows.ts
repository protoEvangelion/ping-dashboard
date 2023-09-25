import { CoordinatorClientMsg, TestRecord } from '../../../types'

export function transformTestRows(
    msg: CoordinatorClientMsg,
    prevData: TestRecord[] = []
): TestRecord[] {
    // do granular update
    if ('test' in msg) {
        return prevData.reduce<TestRecord[]>(
            (prev, curr) => [
                ...prev,
                curr.id === msg.test.id ? msg.test : curr,
            ],
            []
        )
    }

    return msg.tests
}
